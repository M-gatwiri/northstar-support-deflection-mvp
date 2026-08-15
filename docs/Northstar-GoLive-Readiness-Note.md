# Northstar QuickHelp — Go-Live Readiness Note
*(formerly `northstar-support-deflection-mvp`)*

**Live MVP:** northstar-support-deflection-mvp.vercel.app · **Repo:** github.com/M-gatwiri/northstar-support-deflection-mvp · **Status:** MVP demo-ready, not production-ready

## What it does
A self-service tool for two support scenarios: **Order Status** (status, delivery date, carrier) and **Returns & Refunds** (return eligibility, refund status). Customer enters an order number; the app answers instantly. No login, no ticket, no agent.

## ✅ What works
- Order lookup for 10 seeded mock orders (`NS1001`–`NS1010`), case-insensitive, trims whitespace.
- Clear error states for invalid orders and empty submissions.
- Returns/refunds logic correctly branches on order status: eligible (delivered), refunded (cancelled), not-yet-eligible (still in transit).
- Back-navigation, Enter-key search, and mobile-responsive layout all confirmed working.
- 14/14 manual QA test cases passed (full log in `src/tests/tests-cases.md`).
- Deployed and publicly reachable on Vercel.

## ⚠️ What's known-broken or missing
- **No real data connection.** All orders are hardcoded in `src/data/orders.js`. It is not talking to Northstar's actual order system — this only ever shows the 10 built-in test orders.
- **No identity check.** Anyone who enters a valid order number sees that order's details — there's no login or verification tying a lookup to the person asking. Not safe to connect to real customer data as-is.
- **Delivery dates are static text**, not calculated — they will read as stale/wrong over time.
- **Stock availability wasn't built** — it was in the original problem statement but is out of scope for this MVP.
- **No analytics** — nothing measures whether this is actually reducing ticket volume.
- **No automated tests** — only the manual QA log; nothing guards against future regressions.
- **`docs/decision-log.md` is empty** — no written record of product decisions to date.

## 🔧 To pick this up without us in the room
1. **Run it locally:** `git clone` the repo → `npm install` → `npm run dev`. No environment variables or API keys needed — there's nothing external configured yet.
2. **To change mock data:** edit `src/data/orders.js` directly (it's a plain array — add/edit/remove orders and redeploy).
3. **To change copy or business rules** (e.g. the 30-day return window): both are hardcoded in `src/components/OrderStatus.jsx` and `ReturnsRefunds.jsx`. There's no CMS or config file — any content change means editing code and redeploying.
4. **Deployment:** live site is on Vercel, almost certainly auto-deploying from the `main` branch on GitHub — confirm this in the Vercel project dashboard before assuming pushes go live automatically.
5. **Before connecting real customer data:** address the identity-check gap above first. This MVP was built to prove the concept, not to sit safely in front of production order data.
6. **Next build priority:** wiring `orders.js` up to a real order API is the single highest-leverage next step — both lookup components already isolate that logic into one function each, so it's a contained change.

