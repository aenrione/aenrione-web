---
title: "Building FiNoSync: My Personal Finance App for the Chilean Reality"
published: 2026-03-10T23:22:00-03:00
draft: true
description: "Why I built a personal finance monorepo integrating Fintoc, Buda, and Fintual — and what I learned along the way."

tags:
- rails
- react-native
- chile
- fintech
lang: "en"
---

# Building FiNoSync: My Personal Finance App for the Chilean Reality

I've always had a complicated relationship with my own money. Not in a dramatic sense — I earn, I spend, I try to save — but I never really *knew* what was happening. My checking account was in one app, my crypto was in Buda, and my Fintual investments were in yet another tab I forgot to check. Every month-end I'd try to reconcile everything manually and inevitably give up halfway through.

So I did what any developer does when they can't find a tool that fits: I built one.

## The Problem With Existing Apps

There are plenty of budgeting apps out there. Mint, YNAB, Fintool — they all work reasonably well if you live in the US. But in Chile, the financial landscape is different. You have Fintoc for bank account aggregation, Buda for crypto, Fintual for low-cost index fund investing. None of the mainstream apps talk to these services. And I wasn't about to manually import CSVs every week.

I needed something that understood my reality.

## Enter FiNoSync

[FiNoSync](https://github.com/aenrione/finosync) is a personal finance management monorepo: a Rails API backend and a React Native mobile app that actually connect to the financial services I use every day.

The core idea is simple: one place to see everything. Bank balances from Fintoc, crypto holdings from Buda, investment returns from Fintual — all aggregated, categorized, and visualized. Add your own manual transactions on top of that, and you finally have the full picture.

## The Stack

I went with a monorepo structure using **pnpm workspaces** and **Turborepo** for build orchestration. The repo looks like this:

```
finosync/
├── apps/
│   ├── backend/   # Rails 8 API
│   └── mobile/    # React Native + Expo
└── packages/
    ├── eslint-config/
    └── typescript-config/
```

This setup lets me share TypeScript and ESLint configs across the whole project without duplicating anything. `pnpm dev` spins up everything at once. Turborepo handles incremental builds so I'm not recompiling what hasn't changed.

### Backend: Rails 8 API

I chose **Ruby on Rails 8** (API-only mode) for the backend. It might seem like an unusual choice alongside a TypeScript-heavy frontend, but Rails is genuinely great for this kind of data-heavy CRUD work. Active Record handles the complexity of financial data relationships cleanly, and the ecosystem for background jobs (Sidekiq) is rock solid.

For the database I'm using **SQLite3** in development. It's simple, it's fast, and for a personal app you're not running concurrent write loads that would stress it. Background jobs via Sidekiq sync data from external APIs on a schedule so the mobile app always has fresh data without hammering third-party rate limits.

Authentication is session-based with **bcrypt** — nothing fancy, but secure.

### Mobile: React Native + Expo

The mobile app runs on **React Native with Expo SDK 53**. Expo Router handles navigation with a file-based approach similar to Next.js, which I appreciate for its clarity. The UI is built with **Gluestack UI** styled through **NativeWind** (Tailwind for React Native), which means I write Tailwind classes and get consistent design across iOS and Android without fighting StyleSheet.

For state management:
- **Zustand** for local client state — lightweight and doesn't make me write reducers.
- **React Query** for server state — cache, refetch, loading states all handled automatically.

Internationalization is done with **i18next** supporting EN and ES out of the box.

## The Integrations

This is the part I'm most proud of.

**Fintoc** gives me read access to Chilean bank accounts via open banking. Transactions come in normalized, categorized, and with merchant data. It's genuinely one of the better fintech APIs I've worked with.

**Buda** is Chile's main crypto exchange. Their API is clean and I use it to pull real-time portfolio values across BTC, ETH, and whatever else I'm holding at any given moment.

**Fintual** is the investment platform I use for index-fund investing. Their public API lets me pull current fund values and returns, so I can see how my long-term portfolio is doing without opening another app.

All three sync via background jobs, and the mobile app just queries the Rails API. The external services are an implementation detail from the app's perspective.

## Multi-Currency Support

Because Buda deals in USD-denominated assets and my bank accounts are in CLP, I needed proper multi-currency handling from the start. FiNoSync supports multiple currencies with real-time conversion rates, so the dashboard always shows a single consolidated view regardless of what denomination each asset lives in.

## What I Learned

**Monorepos are worth it for full-stack projects.** The shared configs alone save me enough time to justify the setup. Turborepo's caching makes CI fast once you have it configured.

**Rails still slaps for APIs.** I went back and forth on whether to use something more JavaScript-native like Fastify or Hono, but Rails' productivity for data-heavy backends is hard to beat. Active Record migrations, Sidekiq integration, and a mature test ecosystem — it all just works.

**Design for your own use case first.** The integrations that make FiNoSync useful for me are the ones that make it useless for someone in another country. That's fine. I built this for my reality, and it genuinely improved how I track my finances.

## Try It Yourself

The project is open source at [github.com/aenrione/finosync](https://github.com/aenrione/finosync). If you're in Chile and use any of these services, you'll find it useful. If you're elsewhere, the architecture and monorepo setup might still be worth poking at.

Getting started is straightforward:

```bash
# Clone and install
git clone https://github.com/aenrione/finosync
cd finosync
pnpm install

# Backend
cd apps/backend
bundle install
bin/rails db:setup

# Run everything
pnpm dev
```

Configure your API keys in the `.env` files for Fintoc, Buda, and Fintual, and you're running.

Finally knowing where my money is? Worth every commit.