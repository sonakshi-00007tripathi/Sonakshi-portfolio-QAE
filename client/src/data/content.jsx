/* =========================================================
   All portfolio content lives here, so updating text,
   photos or links never means touching component code.
   ========================================================= */

const img = (name) => `/assets/${name}`;

export const profile = {
  name: 'Sonakshi Tripathi',
  firstName: 'Sonakshi',
  role: 'QA Engineer Intern, GoComet',
  education: "B.Tech CSE '27, LPU",
  location: 'Bangalore, India',
  email: 'tripathisonakshi705@gmail.com',
  resume: '/resume.pdf',
  target: 'Amazon',
  targetRole: 'Quality Assurance Engineer I',
  targetShort: 'QAE-1',
};

export const links = {
  linkedin: 'https://www.linkedin.com/in/sonakshi-tripathi2030',
  github: 'https://github.com/sonakshi-00007tripathi',
  leetcode: 'https://leetcode.com/u/sonakshi705/',
  youtube: 'https://www.youtube.com/@sonakshitripathi30',
};

export const navLinks = [
  { href: '#bughunt', label: 'Bug Hunt' },
  { href: '#fit', label: 'JD Match' },
  { href: '#track', label: 'Journey' },
  { href: '#build', label: 'Builds' },
  { href: '#strategy', label: 'Test Strategy' },
  { href: '#contact', label: 'Contact' },
];

export const gate = {
  photo: { src: img('bench-laptop.jpg'), alt: 'Sonakshi smiling with her laptop on a campus bench', caption: 'handle with ownership' },
  bubble: 'Psst… I already checked this box for bugs.',
};

export const hero = {
  photos: [
    { src: img('campus.jpg'), alt: 'Sonakshi at the LPU campus', caption: 'campus, chapter one', className: 'p1' },
    { src: img('car-window.jpg'), alt: 'Sonakshi in sunglasses leaning out of a car window', caption: 'always exploring ✌', className: 'p2' },
  ],
  sticker: '1st girl in my family to study away 🧡',
};

/* Numbers count up on scroll. `count` describes how to animate; omit it for text values. */
export const stats = [
  { icon: '⚡', value: '1 wk → 5 min' /* non-breaking spaces: wraps as "1 wk →" / "5 min" */, label: 'manual customs audit I automated' },
  { icon: '🛡️', value: '0', label: 'post-release defects on products I signed off', count: { from: 9, to: 0 } },
  { icon: '🐞', value: '100+', label: 'defects caught before customers saw them', count: { to: 100, suffix: '+' } },
  { icon: '📦', value: '4', label: 'production products where I am the sole QA owner', count: { to: 4 } },
  { icon: '🩹', value: '~98%', label: 'faster test fixes with my self-healing AI skill', count: { to: 98, prefix: '~', suffix: '%' } },
  { icon: '✅', value: '500+', label: 'Jira tickets, 100% on time', count: { to: 500, suffix: '+' } },
];

/* ---------- Journey ("Track your package") ---------- */
export const journey = [
  {
    chip: 'ORDER PLACED',
    place: '📍 Satna, Madhya Pradesh',
    title: 'Packed in a small city with big plans.',
    body: [<>I finished class 10 and 12 in Satna. Then I took the LPUNEST exam and got a <b>30% scholarship</b> to study Computer Science.</>],
  },
  {
    chip: 'SHIPPED · FIRST ONE OUT',
    place: '📍 LPU, Punjab · Aug 2023',
    title: "I didn't just take a path. I opened one.",
    body: [<>I was the <b>first girl in my whole family</b> to leave home to study. Everyone was so happy for me, and then something beautiful happened: families started sending their daughters out to study too.</>],
    note: "Others are walking the road now. That's my favourite thing I've ever built.",
    mediaLayout: 'duo',
    media: [
      { src: img('lpu-gate.jpg'), alt: 'Sonakshi pointing at the LPU building', caption: 'where it all started 👆', rot: -3, land: true },
      { src: img('parents.jpg'), alt: 'Sonakshi with her parents at LPU', caption: 'Mumma, Papa & me 🧡', rot: 5 },
    ],
  },
  {
    chip: 'IN TRANSIT · TURBULENCE',
    place: '📍 Hackathon halls, 2 a.m.',
    title: 'My first line of code was in college.',
    body: [
      <>It was hard. I wasn't the fastest in the room, so I chose to be the most consistent. I learnt DSA from scratch, solved <b>150+ LeetCode problems</b> and signed up for every hackathon I could find, including <b>36- and 48-hour ones</b> with zero sleep.</>,
      <>At <b>Smart India Hackathon 2025</b>, my team built a full-stack internship recommender and made it to <b>LPU's internal final round</b>.</>,
    ],
    media: [
      { src: img('sih-team.jpg'), alt: 'Sonakshi with her team at Gear Up Season 4, the 36-hour SIH 2025 qualifier hackathon', caption: 'my SIH squad · 36 hrs', rot: -4 },
      { src: img('hackathon.jpg'), alt: 'Sonakshi coding at a hackathon', caption: 'hour 30. still smiling.', rot: 3 },
    ],
  },
  {
    chip: 'SCENIC DETOUR · WORTH IT',
    place: '📍 Stage & camera',
    title: 'Dancer, singer, actor, creator.',
    body: [<>College was never just classrooms. I danced, sang and did drama. I also started documenting my college life on YouTube. A few videos crossed <b>50K+ views</b>, and I earned <b>₹2.5 lakh+</b> as a creator while still studying.</>],
    youtube: { handle: '@sonakshitripathi30', href: links.youtube },
    media: [
      { src: img('trophy.jpg'), alt: 'Sonakshi holding an overall winner trophy', caption: 'overall winner 🏆', rot: -2, land: true },
    ],
  },
  {
    chip: 'OUT FOR DELIVERY',
    place: '📍 GoComet, Bangalore · Mar 2026 →',
    title: '5th semester: time to crack something real.',
    body: [
      <>I learnt the stack, prepared hard and got placed at GoComet as the <b>first female student from LPU's 2027 batch</b>. I was also the youngest person in the whole office.</>,
      <>My parents distributed mithai to the entire family. Their smiles gave me the confidence to aim higher. I want to make them prouder still.</>,
    ],
    note: 'Since then: sole QA owner for 4 production products · 100+ bugs caught pre-release · 0 escaped to customers.',
    media: [
      { src: img('gocomet-sign.jpg'), alt: 'Sonakshi at the GoComet office under the neon GoComet sign', caption: 'my second home 💙', rot: 3, style: { width: 'min(290px, 72%)' } },
    ],
    gallery: {
      title: '📸 Life at GoComet',
      photos: [
        { src: img('office-team.jpg'), alt: 'Sonakshi building mini puzzle models with teammates at GoComet', caption: 'always building something 🧩', rot: -4 },
        { src: img('gocomet-girls.jpg'), alt: 'Sonakshi with two colleagues under the GoComet sign', caption: 'my GoComet girls 💙', rot: 3 },
        { src: img('office-view.jpg'), alt: 'Laptop and tablet by the window at the GoComet Bangalore office', caption: 'office with a view ☁️', rot: -2 },
        { src: img('office-desk.jpg'), alt: 'Sonakshi at her desk in the GoComet Bangalore office', caption: 'desk days, tumbler always 💻', rot: 4 },
      ],
    },
  },
  {
    pending: true,
    chip: 'ARRIVING',
    place: '📍 Amazon · Quality Assurance Engineer I',
    title: 'Next stop: guarding the Amazon customer.',
    body: [
      <>It's my dream company. Hundreds of millions of people trust that their order, their payment and their delivery date will just <i>work</i>. Keeping that promise is a quality engineer's job, and it's the job I want.</>,
      <>I love that Amazon gives ownership to people who want it and treats every day like Day 1. That's already how I test.</>,
    ],
    eta: 'Estimated delivery: the day you say yes. Pre-release checks: all green ✓',
  },
];

/* ---------- Builds ---------- */
export const featureProject = {
  tags: ['TypeScript', 'Playwright', 'REST APIs', 'CSV'],
  title: 'AI-Assisted Document Validation Engine',
  summary: <>Checks data extracted by GoComet's DRDV product against <b>6,000+ Bill of Entry reports</b>, field by field, across 5 data sections.</>,
  points: [
    <><b>Dove deep when V1 was too slow.</b> The browser-driven version handled 3 records in 2.6 minutes. I captured the app's network calls and rebuilt it <b>API-first</b>. It now handles thousands of records per run with no browser at all.</>,
    <><b>Field-level comparison engine</b> that sorts every discrepancy into <b>5 error types</b>, with an alias-mapping layer for abbreviated columns.</>,
    <><b>Built for humans.</b> I replaced 3,000 lines of raw JSON with console tables and CSV reports, so the tool can be reused for any document type.</>,
    <><b>Adopted team-wide</b> as a reusable pattern.</>,
  ],
  bars: {
    title: 'Time to audit 6,000+ reports',
    rows: [
      { label: 'Manual audit', value: '~1 week', width: 100 },
      { label: 'My pipeline', value: '~5 min / batch', width: 2, fast: true },
    ],
  },
};

export const projects = [
  {
    kicker: 'AI-Powered Test Automation Toolkit · Aug 2026',
    title: 'Tests that heal themselves',
    body: <>Built Claude Code skills on MCP: a <b>self-healing test skill</b> that diagnoses and repairs failing tests from the terminal during go-lives (<b>2–3 hrs → 2–3 min</b>), a one-command Jira skill that ended manual time-logging for the whole team, and an <b>AI PR-review skill</b> that chains into auto-fix.</>,
    badge: '⚡ ~98% faster fixes · adopted team-wide',
  },
  {
    kicker: 'Smart India Hackathon 2025 · MERN',
    title: 'PM Internship Recommender',
    body: 'A multi-tier app (React → Node/Express → MongoDB) that matches students to PM Internship Scheme roles using an ML model. I built the React frontend and REST APIs, then wrote Playwright end-to-end tests for the core user journeys, so the demo never broke on stage.',
    badge: '🏁 LPU internal final round',
  },
  {
    kicker: 'GoComet · Test framework migration',
    title: 'Java → TypeScript test suite',
    body: <>Led the migration of <b>65+ DRDV test specs</b> from Java to TypeScript. Started on the Playwright Java BDD (Cucumber) framework, rebuilt it with <b>OOP principles and the Page Object Model</b>, then ran full regressions to prove parity before switching over.</>,
    badge: '✓ parity verified',
  },
  {
    kicker: 'GoComet · Sole QA owner',
    title: 'DRDV · Textract · GoInvoice · GoProcure',
    body: <>Sole QA owner for <b>4 production products</b>: test plans, test cases, test data, release-risk calls and stakeholder sign-off every release. Security-tested <b>PII masking</b> and <b>MongoDB data segregation</b> with SQL and Mongo queries, and wired Playwright regressions into <b>Jenkins + GitHub Actions</b>.</>,
    badge: '0 post-release defects',
  },
];

/* ---------- Leadership Principles ---------- */
export const principles = [
  { lp: 'CUSTOMER OBSESSION', title: 'A bug I miss is a bug they find.', body: 'Every test I write starts with one question: what would the customer actually do here? I drive release sign-off for four production products used by real logistics teams, with zero post-release defects.', proof: ['post-release defects', '0'] },
  { lp: 'INSIST ON THE HIGHEST STANDARDS', title: '"Done" means verified.', body: "I migrated 65+ specs and didn't call it done until full regression runs proved parity. I automated 100% of in-scope Textract cases. \"It works on my machine\" is not a test result.", proof: ['in-scope automated', '100%'] },
  { lp: 'OWNERSHIP', title: 'The release sign-off is mine.', body: 'I am the sole QA owner for DRDV, Textract, GoInvoice and GoProcure: test plans, automation, test data, release-risk calls and the final go / no-go. If it ships broken, that is on me, so it does not ship broken.', proof: ['products owned solo', '4'] },
  { lp: 'DIVE DEEP', title: 'Opened DevTools, found the real fix.', body: "My UI-driven validator was slow because it drove a browser. I captured the app's network calls and rebuilt it API-first. Same checks, thousands of records per run.", proof: ['records / run', '3 → 1000s'] },
  { lp: 'INVENT AND SIMPLIFY', title: 'A week of checking → 5 minutes.', body: 'I automated a manual customs audit into a batch pipeline, and built a self-healing test skill that repairs failing tests from the terminal during go-lives: 2–3 hours of fixing became 2–3 minutes.', proof: ['fix time', '~98% faster'] },
  { lp: 'EARN TRUST', title: 'With developers, not against them.', body: "A bug report should make a developer's job easier. Mine come with exact steps, evidence and a suspected root cause, and I pair on the fix instead of throwing it over the wall.", proof: ['bugs over the wall', '0'] },
  { lp: 'DELIVER RESULTS', title: 'On time, every time.', body: '500+ Jira tickets in an Agile team, every one delivered on schedule, and 100+ defects caught before they reached a customer.', proof: ['on-time delivery', '100%'] },
  { lp: 'LEARN AND BE CURIOUS', title: 'Zero code to production in 3 years.', body: "First line of code in college; now production test pipelines, Claude Code skills, MCP and LLM evals. Along the way I've been a dancer, singer, actor, YouTuber and explorer.", proof: ['certs', 'OCI Gen AI · GfG DSA'] },
  { lp: 'BIAS FOR ACTION', title: "Didn't wait for final year.", body: 'In my 5th semester I decided it was time, prepared hard and got placed, the first female student from my batch to do it.', proof: ['placed in', 'sem 5'] },
  { lp: 'THINK BIG', title: 'I opened a door for a whole family.', body: "The first girl to leave home to study. Now families send their daughters too. That's the kind of impact I want my work to have: it protects people I'll never meet.", proof: ['doors opened', '∞'], special: true },
];

/* ---------- Why QAE ---------- */
export const whyQae = {
  eyebrow: 'Why Quality Assurance Engineer?',
  quote: ['Customers never see the bugs I catch. ', "That's the whole point."],
  points: [
    { title: 'I test like a customer.', body: 'Real people paste weird data, lose network mid-checkout and click "Pay" twice. I write those cases first, because that is where the money and the trust get lost.' },
    { title: 'I automate what repeats.', body: "If I've checked something twice by hand, the third time is a script. My validation engine turned a week of manual audit into a 5-minute run, and the team still uses it." },
    { title: 'I build the tools, not just the tests.', body: 'API-first pipelines, comparison engines, readable reports. Good QA is engineering: I bring software skills to the problem of proving software works.' },
  ],
};

/* ---------- Bug Hunt (interactive) ----------
   A tiny checkout with planted defects. Each `id` is wired to a clickable
   spot in BugHunt.jsx; this is the bug report that opens when it's found. */
export const bugHunt = {
  intro: 'This checkout has 7 planted bugs, from a typo to a security hole. A good QAE finds them in under a minute. Click anything that looks wrong.',
  bugs: [
    { id: 'url', sev: 'Critical', area: 'Security', title: 'Card number leaked in the URL', expected: 'Payment details never appear in URLs', actual: '?card=4111… ends up in browser history, proxy logs and analytics' },
    { id: 'title', sev: 'Low', area: 'UI / copy', title: 'Typo in product title', expected: '"Quality Assurance Engineer"', actual: '"Quality Assurance Enginer"' },
    { id: 'image', sev: 'Medium', area: 'Accessibility', title: 'Product image has no alt text', expected: 'Screen readers announce the product', actual: 'Broken image with alt="" is silent to screen-reader users' },
    { id: 'items', sev: 'High', area: 'Cart logic', title: 'Item count ≠ quantity', expected: 'Qty 1 → "Items (1)"', actual: 'Qty 1 → "Items (2)"' },
    { id: 'date', sev: 'High', area: 'Date handling', title: 'Impossible delivery date', expected: 'A real calendar date', actual: '"Arriving 31 Feb"' },
    { id: 'coupon', sev: 'Critical', area: 'Pricing', title: 'Coupon applied twice', expected: 'DAY1 discount applied once (−₹50)', actual: 'DAY1 applied twice (−₹100), revenue leak on every order' },
    { id: 'total', sev: 'Critical', area: 'Pricing', title: 'Wrong total, raw float', expected: '₹449.00 (₹499 − one ₹50 coupon, 2 decimals)', actual: '₹398.99999999999994 (double discount + money stored as a float)' },
  ],
  allFound: "All found. You'd make a great QAE too. Now imagine what I'd find in your release candidate. 😉",
};

/* ---------- JD traceability matrix ----------
   Every line of the Amazon QAE-1 job description, mapped to evidence.
   status: 'pass' | 'gap'. `quote` is the JD's wording, kept short. */
export const jdTrace = {
  role: 'Quality Assurance Engineer I · Bengaluru · Job ID A10595858',
  rows: [
    { req: 'Create test plans, test strategies and test cases; validate via manual and automated tests', proof: <>Sole QA owner for <b>4 production products</b>: I write the test plans and cases, set up test data, and automated <b>100% of in-scope Textract cases</b>. See how I'd plan a test strategy further down.</>, link: '#strategy' },
    { req: 'Functional regression testing', proof: <>Migrated <b>65+ specs</b> Java → TypeScript and ran full regressions to prove parity. Playwright regression suites run in <b>Jenkins + GitHub Actions</b>, so release blockers surface early.</>, link: '#build' },
    { req: 'Integration testing of distributed, service-oriented systems', proof: <>My validation pipeline verifies <b>data flow between DRDV's extraction APIs and downstream customs reports</b>: 6,000+ reports, field by field across 5 sections. At SIH I E2E-tested a React → Express → MongoDB multi-tier app.</>, link: '#build' },
    { req: 'Identify scaling issues', proof: <>Spotted that my browser-driven V1 couldn't scale (3 records / 2.6 min), found the bottleneck in the network layer and rebuilt it API-first: <b>thousands of records per run</b>.</>, link: '#build' },
    { req: 'Identify security issues', proof: <>At GoComet I security-tested <b>PII masking</b> and <b>MongoDB data segregation</b>, verifying backend data with <b>SQL and NoSQL queries</b> to catch data leakage. This site's own API is rate-limited and validated too; bug #1 in the hunt above is a security bug.</>, link: '#bughunt' },
    { req: 'Java, Python, JavaScript, SQL', proof: <><b>Java</b> (Playwright Java BDD framework), <b>TypeScript / JavaScript</b> (production pipelines), <b>Python</b>, and <b>SQL</b> for backend data validation.</> },
    { req: 'User-level automation with tools such as Selenium', proof: <><b>Selenium WebDriver</b>, Cypress, TestNG / JUnit, Rest Assured and Cucumber BDD with the Page Object Model; <b>Playwright</b> for the UI and E2E automation I run today.</> },
    { req: 'Drive efficiencies; invest in automation and tools to reduce overall QA effort', proof: <>Turned a <b>1-week manual customs audit into a 5-minute run</b>, and built a <b>self-healing test skill</b> (fix time 2–3 hrs → 2–3 min) and an AI PR-review skill. <b>Adopted team-wide.</b></>, link: '#build' },
    { req: 'Work closely with development groups', proof: <>I pair with developers on root cause instead of throwing bugs over the wall. <b>500+ Jira tickets</b> in an Agile team, 100% on time.</>, link: '#principles' },
    { req: 'Drive test-case sign-off with stakeholders; test execution and reporting', proof: <>I drive <b>test sign-off with stakeholders</b> every release for 4 products, <b>0 post-release defects</b>. My reports are console tables + CSVs that non-QA stakeholders actually read.</> },
    { req: 'CS fundamentals: OOD, operating systems, algorithms, data structures, complexity analysis', proof: <><b>150+ LeetCode</b> problems, GfG DSA certification, object-oriented redesign of a real test framework, plus OS / DBMS / networks coursework.</>, link: '#skills' },
    { req: 'Previous technical internship(s) or demonstrated project experience', proof: <><b>QA Engineer Intern at GoComet</b> since Mar 2026 (sole QA owner, 4 production products), plus a Smart India Hackathon 2025 finalist project.</>, link: '#track' },
    { req: 'Distributed, multi-tiered systems and relational databases', proof: <>Built and tested a multi-tier app end to end; backend data validated with <b>SQL and NoSQL (MongoDB) queries</b>; API-level testing of services in production.</> },
    { req: 'Strong analytical skills, attention to detail, effective communication', proof: <>A comparison engine that sorts every discrepancy into <b>5 error types</b>. And on the side, a YouTube channel where a few videos crossed <b>50K+ views</b>: I can explain things.</> },
    { req: 'Optimization mathematics (linear programming, nonlinear optimization)', status: 'gap', proof: <>Honest gap: not a strength yet. It's listed as preferred, and it's next on my learning list. Reporting it beats hiding it; that's the job too.</> },
  ],
};

/* ---------- Test strategy explorer ----------
   "Give me a feature, I'll give you a test strategy." Generic e-commerce
   features; each layer lists concrete test ideas. */
export const testStrategy = [
  {
    id: 'coupon',
    tab: '🏷️ Coupon at checkout',
    risk: 'Money moves here. One pricing bug × millions of orders = a very bad day.',
    layers: [
      { name: 'Functional', cases: ['Valid code reduces the total exactly once', 'Removing an item re-checks coupon eligibility', 'Expired or invalid code shows a clear, specific error'] },
      { name: 'Boundaries & edge cases', cases: ['Cart at exactly the minimum spend, and ₹0.01 below it', 'Coupon worth more than the cart: total never goes negative', 'Money in integer paise, rounded once, shown to 2 decimals'] },
      { name: 'Negative & security', cases: ['Same code applied twice, or on a double-clicked "Apply"', 'Tampered price or discount in the request: server recomputes', 'Code brute-forcing is rate-limited'] },
      { name: 'Integration', cases: ['Amount charged by payments = amount shown in cart', 'Return or refund reverses the discount correctly', 'Pricing service down: checkout fails safe, never free'] },
      { name: 'Scale', cases: ['Sale-day spike: validation latency stays within SLA', 'Concurrent redemptions of a single-use code: only one wins'] },
      { name: 'Automation plan', cases: ['Pricing rules as data-driven API tests (fast, run on every merge)', '2–3 Selenium / Playwright UI smoke tests for the happy path', 'Regression suite gates the release; failures block sign-off'] },
    ],
  },
  {
    id: 'delivery',
    tab: '🚚 Delivery-date promise',
    risk: '"Arriving tomorrow" is a promise. Breaking it costs trust, not just money.',
    layers: [
      { name: 'Functional', cases: ['Same date on product page, cart, confirmation and tracking', 'Date updates when the address or pincode changes'] },
      { name: 'Boundaries & edge cases', cases: ['Order cut-off: 11:59:59 vs 12:00:00', '29 Feb, year-end, Sundays and public holidays', 'Timezone: server UTC vs customer IST'] },
      { name: 'Negative & security', cases: ['Unserviceable or malformed pincode', 'Item goes out of stock between cart and payment'] },
      { name: 'Integration', cases: ['Inventory ↔ warehouse ↔ logistics ↔ UI agree on one date', 'Carrier delay event reaches the customer in time'] },
      { name: 'Scale', cases: ['Festive-season order volume across thousands of pincodes', 'Promised vs actual date compared over thousands of orders: field-by-field diff + CSV report, exactly what my validation engine does'] },
      { name: 'Automation plan', cases: ['Parameterised date-calculation tests over a pincode × time matrix', 'Nightly reconciliation job that flags broken promises'] },
    ],
  },
  {
    id: 'orders',
    tab: '📜 Order-history API',
    risk: "Personal data. The worst bug here isn't a crash: it's showing someone else's orders.",
    layers: [
      { name: 'Functional', cases: ['Returns only my orders, newest first', 'Pagination: no duplicates, no gaps between pages'] },
      { name: 'Boundaries & edge cases', cases: ['0, 1 and 10,000+ orders', 'Exact page-size boundaries; unicode product names'] },
      { name: 'Negative & security', cases: ["Change the user ID in the request: never see another user's orders (IDOR)", 'Missing or expired token → 401, not 500', 'SQL injection in filter parameters'] },
      { name: 'Integration', cases: ['Contract test: schema matches what the app expects', 'A newly placed order appears within the agreed delay'] },
      { name: 'Scale', cases: ['p99 latency under load for the heaviest accounts', 'Response size stays bounded however many orders exist'] },
      { name: 'Automation plan', cases: ['API + contract tests in CI on every merge', 'Security cases in the regression suite, not a one-off audit'] },
    ],
  },
];

/* ---------- Skills ("What's in the box") ---------- */
export const skills = [
  { group: 'Testing & QE', items: ['Test Strategy & Test Plans*', 'Test Case Design*', 'Functional Testing', 'Regression Testing*', 'Integration Testing*', 'API Testing', 'E2E Testing', 'Exploratory Testing', 'Security & Risk-Based Testing*'] },
  { group: 'Languages', items: ['Java*', 'Python', 'TypeScript*', 'JavaScript'] },
  { group: 'Automation Frameworks', items: ['Playwright*', 'Selenium WebDriver*', 'Cypress', 'TestNG', 'JUnit', 'Rest Assured', 'Cucumber (BDD)', 'Page Object Model'] },
  { group: 'CI/CD & Tools', items: ['Jenkins*', 'GitHub Actions*', 'Docker', 'AWS', 'Git', 'Maven', 'Jira', 'Postman', 'LambdaTest'] },
  { group: 'Databases', items: ['SQL*', 'MongoDB*'] },
  { group: 'CS Fundamentals', items: ['Data Structures', 'Algorithms*', 'Object-Oriented Design*', 'Operating Systems', 'Complexity Analysis'] },
  { group: 'AI-Assisted Engineering', items: ['Claude Code*', 'MCP', 'Playwright MCP', 'LLM Evals (DeepEval)', 'RAG', 'AI Guardrails', 'n8n'] },
  { group: 'Education', items: ['B.Tech CSE · Lovely Professional University · 2023 – 2027 · CGPA 7.5'] },
];

/* ---------- Off the clock ---------- */
export const life = [
  { src: img('ipl.jpg'), alt: 'Sonakshi in an RCB jersey at a cricket stadium', caption: 'RCB jersey in an away crowd. Loyalty: non-negotiable.' },
  { src: img('cultural.jpg'), alt: 'Sonakshi in a traditional costume at a cultural fest', caption: 'culture fest, crowned & fearless' },
  { src: img('car-window.jpg'), alt: 'Sonakshi enjoying a road trip', caption: 'window seat, always 🌍' },
];
