import { useCallback, useEffect, useRef, useState } from 'react';

/*
 * Voice unlock ("Alexa, hire Sonakshi") with two modes:
 *
 *  1. "speech": Web Speech API. Accurate, but Chrome streams audio to Google's
 *     servers, so it fails with a "network" error on locked-down networks
 *     (office firewalls) and doesn't exist in Firefox.
 *  2. "local": fallback that never leaves the browser. Web Audio measures mic
 *     loudness and unlocks once it hears ~0.7s of speech. It can't read the
 *     words, but it works offline and behind any firewall.
 *
 * We start in "speech" mode when available and switch to "local" automatically
 * if the speech service is unreachable.
 */

// Speech engines often hear "hire" as "higher"/"hair", so any of these counts as a yes.
const YES = /\b(hire[sd]?|hiring|higher|hair|hyre|alexa|sonakshi|sonaxi)\b/i;

const MSG = {
  notAllowed: 'Mic permission is blocked. Click the 🔒 / mic icon in the address bar → Allow, then tap again.',
  noMic: 'No microphone found. Plug one in, or just open the box →',
  noSpeech: "I didn't hear anything. Tap and speak a little louder 🙂",
  switchedLocal: "Google's speech service is blocked on this network, so I'll listen locally instead. Tap again and say it out loud 🎧",
  listeningSpeech: '🎙 Go ahead, say "Alexa, hire Sonakshi"',
  listeningLocal: '🎧 Listening on your device… say "Alexa, hire Sonakshi" out loud',
  heardLocal: '✅ Heard you! Opening the box…',
  timeoutLocal: "Didn't catch that. Tap and say it a little louder 🙂",
  unsupported: "This browser can't use the mic. Just open the box →",
};

const LOCAL = { calibrateMs: 350, voicedMsToUnlock: 700, timeoutMs: 8000, minThreshold: 0.02, floorMultiplier: 2.5 };

const getRecognizer = () =>
  typeof window === 'undefined' ? null : window.SpeechRecognition || window.webkitSpeechRecognition || null;
const hasMic = () => typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;

/** Returns { supported, listening, status, level (0–1, local mode), mode, toggle }. */
export function useSpeechUnlock(onUnlock) {
  const SR = getRecognizer();
  const [mode, setMode] = useState(SR ? 'speech' : 'local');
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState('');
  const [level, setLevel] = useState(0);

  const recRef = useRef(null);          // active SpeechRecognition
  const localStopRef = useRef(null);    // cleanup for active local listener
  const timerRef = useRef(null);
  const heardRef = useRef('');
  const doneRef = useRef(false);
  const onUnlockRef = useRef(onUnlock);
  onUnlockRef.current = onUnlock;

  const unlock = useCallback((message) => {
    if (doneRef.current) return;
    doneRef.current = true;
    setStatus(message);
    setTimeout(() => onUnlockRef.current?.(), 550);
  }, []);

  /* ---------- mode 1: Web Speech API ---------- */
  const startSpeech = useCallback(() => {
    heardRef.current = '';
    const rec = new SR();
    rec.lang = 'en-IN';
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 5;

    rec.onresult = (ev) => {
      const alternatives = [];
      for (const result of ev.results) {
        for (let i = 0; i < result.length; i++) alternatives.push(result[i].transcript);
      }
      const heard = ev.results[ev.results.length - 1][0].transcript;
      heardRef.current = heard;
      setStatus(`🎙 "${heard}"`);
      if (alternatives.some((t) => YES.test(t))) {
        try { rec.stop(); } catch { /* noop */ }
        unlock(`✅ "${heard}". Heard you! Opening the box…`);
      }
    };

    rec.onerror = (ev) => {
      switch (ev.error) {
        case 'network':
        case 'service-not-allowed':
          // Speech service unreachable (firewall/offline/browser policy): use local mode from now on.
          setMode('local');
          setStatus(MSG.switchedLocal);
          break;
        case 'not-allowed': setStatus(MSG.notAllowed); break;
        case 'audio-capture': setStatus(MSG.noMic); break;
        case 'no-speech': setStatus(MSG.noSpeech); break;
        case 'aborted': break;
        default: setStatus(`Voice hiccup (${ev.error}). Try again, or just open the box →`);
      }
    };

    rec.onend = () => {
      clearTimeout(timerRef.current);
      setListening(false);
      recRef.current = null;
      const heard = heardRef.current;
      if (!doneRef.current && heard && !YES.test(heard)) {
        setStatus(`I heard "${heard}". So close! Try "Alexa, hire Sonakshi".`);
      }
    };

    try {
      rec.start();
      recRef.current = rec;
      setListening(true);
      setStatus(MSG.listeningSpeech);
      timerRef.current = setTimeout(() => { try { rec.stop(); } catch { /* noop */ } }, 7000);
    } catch {
      setMode('local');
      setStatus(MSG.switchedLocal);
    }
  }, [SR, unlock]);

  /* ---------- mode 2: on-device loudness detection ---------- */
  const startLocal = useCallback(async () => {
    if (!hasMic()) { setStatus(MSG.unsupported); return; }

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (err) {
      setStatus(err?.name === 'NotAllowedError' ? MSG.notAllowed : MSG.noMic);
      return;
    }

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    ctx.createMediaStreamSource(stream).connect(analyser);
    const samples = new Float32Array(analyser.fftSize);

    let raf = 0;
    let floor = 0;
    let voicedMs = 0;
    let lastShown = -1;
    const t0 = performance.now();
    let last = t0;

    const cleanup = () => {
      cancelAnimationFrame(raf);
      stream.getTracks().forEach((t) => t.stop());
      ctx.close().catch(() => {});
      localStopRef.current = null;
      setListening(false);
      setLevel(0);
    };

    const tick = (now) => {
      analyser.getFloatTimeDomainData(samples);
      let sum = 0;
      for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
      const rms = Math.sqrt(sum / samples.length);
      const dt = now - last;
      last = now;

      if (now - t0 < LOCAL.calibrateMs) {
        floor = Math.max(floor, rms); // learn background noise first
      } else {
        const threshold = Math.max(LOCAL.minThreshold, floor * LOCAL.floorMultiplier);
        const shown = Math.round(Math.min(1, rms / (threshold * 3)) * 20) / 20; // throttle re-renders
        if (shown !== lastShown) { lastShown = shown; setLevel(shown); }
        if (rms > threshold) voicedMs += dt;
        if (voicedMs >= LOCAL.voicedMsToUnlock) { cleanup(); unlock(MSG.heardLocal); return; }
      }
      if (now - t0 > LOCAL.timeoutMs) { cleanup(); setStatus(MSG.timeoutLocal); return; }
      raf = requestAnimationFrame(tick);
    };

    localStopRef.current = cleanup;
    setListening(true);
    setStatus(MSG.listeningLocal);
    if (ctx.state === 'suspended') await ctx.resume().catch(() => {});
    raf = requestAnimationFrame(tick);
  }, [unlock]);

  /* ---------- public toggle ---------- */
  const toggle = useCallback(() => {
    if (doneRef.current) return;
    if (recRef.current) { try { recRef.current.stop(); } catch { /* noop */ } return; }
    if (localStopRef.current) { localStopRef.current(); setStatus(''); return; }
    if (mode === 'speech' && SR) startSpeech();
    else startLocal();
  }, [mode, SR, startSpeech, startLocal]);

  useEffect(() => () => {
    clearTimeout(timerRef.current);
    try { recRef.current?.abort(); } catch { /* noop */ }
    localStopRef.current?.();
  }, []);

  return { supported: Boolean(SR) || hasMic(), listening, status, level, mode, toggle };
}
