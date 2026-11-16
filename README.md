# 📦 sonakshi.ship(): a portfolio delivered to Amazon

A MERN-stack portfolio built as a package being shipped to Amazon. A visitor opens the box by saying *"Alexa, hire Sonakshi"*, a scooty with my face on it rides from **Satna (M.P.) to Amazon** as they scroll, and my Amazon Leadership Principles come with receipts.

**Stack:** MongoDB · Express · React (Vite) · Node.js

---

## ✨ Features

| Feature | How it works |
|---|---|
| 🎙️ Voice unlock | Web Speech API hook (`useSpeechUnlock`) with fuzzy matching ("hire" is often heard as "higher") |
| 🛵 Scroll-driven delivery road | `requestAnimationFrame`-throttled scroll listener moves an SVG scooty along a sticky road |
| 🧾 Leadership Principles "receipts" | Content-driven cards with a CSS-mask torn-paper edge |
| 💻 Animated terminal | Replays a run of my validation engine when it scrolls into view |
| 📦 "Confirm delivery" counter | `POST /api/stats/deliveries` → atomic `$inc` upsert in MongoDB |
| ✍️ Leave-a-note form | `POST /api/messages` with server-side validation, honeypot and rate limiting |
| 🛟 Graceful degradation | If the API is down, the site still works: the counter hides and contact falls back to email |

---

## 🗂️ Project structure

```
sonakshi-portfolio/
├── client/                      # React + Vite frontend  → deploy on Vercel
│   ├── public/
│   │   ├── assets/              # photos (resized, metadata stripped)
│   │   ├── favicon.svg
│   │   └── resume.pdf
│   ├── src/
│   │   ├── components/          # one folder per section: Component.jsx + Component.css
│   │   │   ├── common/          # Reveal, Polaroid (shared building blocks)
│   │   │   ├── Gate/            # "Hey Amazon" intro + voice unlock
│   │   │   ├── Navbar/
│   │   │   ├── DeliveryRoad/    # sticky road + ScootyRider SVG
│   │   │   ├── Hero/  Stats/  Journey/  Builds/
│   │   │   ├── Principles/  WhySde/  Skills/  Life/
│   │   │   ├── Contact/         # shipping label, delivery counter, note form
│   │   │   └── Footer/
│   │   ├── data/content.jsx     # ← ALL text, photos & links live here
│   │   ├── hooks/               # useInView, useSpeechUnlock
│   │   ├── services/api.js      # fetch wrapper for the Express API
│   │   ├── styles/global.css    # design tokens + shared styles
│   │   ├── utils/confetti.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js           # dev proxy: /api → localhost:5000
│   └── .env.example
│
├── server/                      # Express + MongoDB API  → deploy on Railway
│   ├── src/
│   │   ├── config/              # env.js (config), db.js (Mongo connection)
│   │   ├── models/              # Message, Counter (Mongoose schemas)
│   │   ├── controllers/         # request handlers
│   │   ├── routes/              # /api/health, /api/stats, /api/messages
│   │   ├── middleware/          # rate limiting, admin auth, DB guard, errors
│   │   ├── utils/               # validateMessage
│   │   ├── app.js               # Express app (helmet, CORS, JSON, routes)
│   │   └── index.js             # entry point
│   └── .env.example
│
├── package.json                 # root scripts: run client + server together
└── README.md
```

> ✏️ **To edit any text, photo or link, change `client/src/data/content.jsx`.** You never need to touch component code for content updates.

---

## 🚀 Run it locally

**Prerequisites:** Node.js 18+ (and optionally a free MongoDB Atlas cluster).

```bash
# 1. install everything (root + client + server)
npm run install:all

# 2. configure the server
cp server/.env.example server/.env      # then fill in MONGODB_URI (optional) and ADMIN_TOKEN

# 3. start both apps
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api/health

No MongoDB yet? That's fine: the API boots anyway, DB routes return `503`, and the site falls back gracefully.

| Script | What it does |
|---|---|
| `npm run dev` | client + server together (hot reload) |
| `npm run dev:client` / `npm run dev:server` | run one side only |
| `npm run build` | production build of the client → `client/dist` |
| `npm start` | start the API in production mode |

---

## 🔌 API

Base URL: `/api`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/health` | API + DB status | none |
| `GET` | `/stats` | `{ deliveries }` counter | none |
| `POST` | `/stats/deliveries` | +1 delivery confirmation | none (rate-limited) |
| `POST` | `/messages` | `{ name, email, message }` → saves a note | none (rate-limited, validated) |
| `GET` | `/messages?limit=50` | read notes, newest first | `x-admin-token` header |

Read the notes visitors leave:
```bash
curl -H "x-admin-token: YOUR_ADMIN_TOKEN" https://YOUR-API.up.railway.app/api/messages
```

---

## ☁️ Deployment

### 1. Database: MongoDB Atlas (free)
1. Create a free **M0** cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. **Database Access** → add a user with a strong password.
3. **Network Access** → allow `0.0.0.0/0` (Railway uses dynamic IPs).
4. **Connect → Drivers** → copy the connection string → this is your `MONGODB_URI`.

### 2. API: Railway
1. New Project → **Deploy from GitHub repo** → pick this repo.
2. Service **Settings → Root Directory:** `server`.
3. **Variables:**
   - `MONGODB_URI` = your Atlas string
   - `CLIENT_ORIGIN` = your Vercel URL, e.g. `https://sonakshi-portfolio.vercel.app`
   - `ADMIN_TOKEN` = a long random string (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `NODE_ENV` = `production`
4. **Settings → Networking → Generate Domain**, then copy the URL.

### 3. Frontend: Vercel
1. Add New Project → import this repo.
2. **Root Directory:** `client` (Vercel auto-detects Vite).
3. **Environment Variable:** `VITE_API_URL` = your Railway URL (no trailing slash).
4. Deploy. Then go back to Railway and make sure `CLIENT_ORIGIN` matches the final Vercel URL.

---

## 🔒 Security notes

- Secrets live only in `.env` / platform variables. `.env` is git-ignored; only `.env.example` is committed.
- `helmet` security headers, CORS locked to `CLIENT_ORIGIN`, JSON bodies capped at 10 KB.
- Write endpoints are rate-limited (10 per 15 min per IP); inputs are trimmed, type-checked and length-limited.
- Honeypot field filters basic spam bots; admin route uses a constant-time token comparison.
- ⚠️ `client/public/resume.pdf` is publicly downloadable. Remove your phone number from it if you don't want that public.

---

Built by **Sonakshi Tripathi** · [LinkedIn](https://www.linkedin.com/in/sonakshi-tripathi2030) · [GitHub](https://github.com/sonakshi-00007tripathi) · [LeetCode](https://leetcode.com/u/sonakshi705/)
