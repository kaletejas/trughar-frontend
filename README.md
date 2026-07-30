# TruGhar Frontend

Next.js + React + TypeScript + Tailwind CSS frontend for TruGhar property recommendations.

## Setup

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your backend URL
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) — the backend should be running on port 3000.

## Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL` = your backend URL
4. Deploy — Vercel handles everything else

## Component Structure

```
components/
├── Navbar.tsx          — Fixed top nav with logo and phone
├── HeroSection.tsx     — Hero headline + 4 input dropdowns + find button
├── Dropdown.tsx        — Reusable searchable dropdown select
├── IncomeSelector.tsx  — 4-bracket income tile selector
├── StatsStrip.tsx      — 4 stat tiles (4 questions, 100% RERA, etc)
├── ResultsSection.tsx  — Results header + property grid + map view + CTA
├── PropertyCard.tsx    — Individual property card with score, details, why-match
└── Footer.tsx          — Copyright and RERA badge
```
