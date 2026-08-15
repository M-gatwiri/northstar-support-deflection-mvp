# Northstar QuickHelp
### Technical & Product Documentation
**Formerly:** `northstar-support-deflection-mvp`
**Repo:** github.com/M-gatwiri/northstar-support-deflection-mvp
**Live MVP:** northstar-support-deflection-mvp.vercel.app
**Status:** MVP — built for the Northstar Sprint industry working simulation

---

## 0. About the name

The repo is currently named after its internal project code (`northstar-support-deflection-mvp`), which is fine for git but isn't a product name anyone would put in front of a customer or a stakeholder deck.

**Proposed name: Northstar QuickHelp**

Reasoning:
- Plays on the existing "Northstar" brand without competing with it.
- "QuickHelp" communicates the actual value proposition — fast, self-serve answers — in two words a customer or exec understands instantly.
- Short enough to work as a button label, a header, or a Slack channel name.

Alternatives considered, in case the team prefers a different direction: **Northstar Self-Serve**, **Northstar Answers**, **Northstar Instant Support**. This document uses "Northstar QuickHelp" throughout; renaming the repo/site to match is a five-minute follow-up (see §14).

---

## 1. Executive Summary

Northstar QuickHelp is a self-service web app that lets Northstar Retail Co. customers resolve two of their most common support requests — **"where is my order?"** and **"can I return this?"** — without opening a ticket. A customer enters their order number and gets an immediate, plain-language answer.

It's a front-end-only React application with no backend: order data is a hardcoded mock dataset, and all logic (return eligibility, refund status, error states) runs client-side. This makes it fast to demo and easy to reason about, but it also defines the boundary of what's actually "live" — see §12, Known Limitations, before treating this as production-ready.

---

## 2. Objectives & Scope

**Problem:** Northstar Retail Co.'s support team is fielding a high volume of repetitive tickets, concentrated in three areas: order status, returns/refunds, and stock availability.

**MVP scope** (what was actually built):
1. 📦 **Order Status** — look up an order and see its status, delivery date, and carrier.
2. 🔄 **Returns & Refunds** — look up an order and see whether it's eligible for return, or what refund action has been taken.

**Explicitly out of scope for this MVP:**
- Stock/inventory availability (identified in the original brief but not built).
- Any account login, authentication, or customer identity verification.
- Any live connection to a real order management system — data is 10 hardcoded mock orders.
- Initiating a return or refund (the app only *informs*, it doesn't *action*).

---

## 3. Architecture Overview

**Stack:** React 19 + Vite 8, plain CSS (no framework), no state management library beyond `useState`, no router (single-page conditional rendering), no backend, no database.

**Why this stack:** appropriate for an MVP — zero infrastructure to stand up, fast to build, fast to deploy to Vercel. The trade-off is that "data" currently means "an array in a source file," which is the main thing that needs to change before this handles real customers (§12).

**Component tree:**
```
App.jsx                        — holds selectedOption state, routes between views
├── SupportOption.jsx (×2)     — the two menu cards on the landing screen
├── OrderStatus.jsx            — order lookup + status display
└── ReturnsRefunds.jsx         — order lookup + return/refund logic
```

**Data flow:** Both `OrderStatus` and `ReturnsRefunds` independently import the same mock dataset (`src/data/orders.js`), hold their own local `orderNumber` / `order` / `error` state, and run an `Array.find()` against the order ID on submit. There is no shared state, no context, and no caching — each screen re-derives everything from scratch. This is simple and correct for 10 records; it is not the pattern you'd want once a real API is involved (see §12).

**No environment variables, no `.env` file, no API keys** — there is currently nothing to configure, because there's nothing external to talk to.

---

## 4. Feature Documentation

### 4.1 Order Status

| Input | Behavior |
|---|---|
| Valid order number (case-insensitive) | Shows status badge, expected delivery date, carrier, and a plain-language status line |
| Unknown order number | "We couldn't find an order with that number." |
| Empty submission | Submit is disabled until something is typed; "Please enter your order number." on submit |
| Enter key | Triggers the same search as clicking "Check Order" |

Order numbers are matched by uppercasing and trimming user input, so `ns1001`, `NS1001`, and ` NS1001 ` all resolve correctly.

### 4.2 Returns & Refunds

Same lookup mechanic as Order Status, but the result branches on the order's `status` field:

| Order status | Customer sees |
|---|---|
| `Delivered` | Eligible for return; 30-day return window stated |
| `Cancelled` | Order was cancelled; refund has been issued |
| Anything else (`Processing`, `Shipped`, `Out for delivery`) | Cannot be returned yet — must wait until delivered |
| Not found | "We couldn't find an order with that number." |
| Empty | "Please enter your order number." |

**Business rule embedded in code, not configurable:** the 30-day return window is a hardcoded string in `ReturnsRefunds.jsx`, not a value read from order data or a config file. If Northstar's actual return policy differs by product category, order value, or region, this MVP does not account for that — it applies one flat rule to every delivered order.

---

## 5. Data Model

`src/data/orders.js` exports a flat array of 10 mock orders:

```js
{
  id: "NS1001",
  status: "Shipped" | "Delivered" | "Processing" | "Out for delivery" | "Cancelled",
  deliveryDate: "August 15, 2026",   // free-text string, not a Date object
  carrier: "Northstar Express",
}
```

Try it live with: `NS1001`–`NS1010` (valid) or `NS9999` (deliberately invalid, for testing the error state).

Two things worth flagging for whoever owns this data next:
- `deliveryDate` is a **hardcoded string**, not computed. Every mock date is set in 2026 relative to when the dataset was written — they will not update themselves and will eventually read as nonsensical ("expected delivery: a date in the past").
- All 10 orders share the same carrier (`Northstar Express`), so multi-carrier display has never actually been exercised.

---

## 6. UI/UX & Design

- Single-page, two-step flow: landing menu → category screen → result card. No routing library; navigating "back" just resets state, so there's no browser back-button support and no deep-linkable URLs (e.g. no way to link someone directly to the Order Status screen).
- Visual language: soft gradient background, rounded cards, indigo/teal accent palette, emoji used as lightweight iconography (📦, 🔃) rather than an icon library.
- Responsive: layout has been manually tested down to mobile widths (see §7, Test 14) and holds up without horizontal scroll.
- No dedicated loading state — lookups are synchronous against an in-memory array, so there's nothing to show a spinner for today. This will matter once a real API is behind the lookup (§12).

---

## 7. Testing & QA

QA was manual, scenario-based, and is documented in full in `src/tests/tests-cases.md`. Summary:

- **14 test cases**, covering: valid lookups across every status type, invalid order numbers, empty submission, lowercase input, back navigation, Enter-key search, and mobile responsiveness.
- **Result: 14/14 passed**, signed off as "Ready for demonstration."

What this test suite does **not** cover, because it can't yet: real API failures/timeouts, concurrent users, authentication edge cases, or anything involving data that isn't one of the 10 hardcoded orders. It's a correctness check against the mock dataset, not a production readiness test.

---

## 8. Project Structure

```
northstar-support-deflection-mvp/
├── docs/
│   └── decision-log.md        — currently empty, see §12
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── OrderStatus.jsx
│   │   ├── ReturnsRefunds.jsx
│   │   └── SupportOption.jsx
│   ├── data/
│   │   └── orders.js          — the entire "database"
│   ├── tests/
│   │   └── tests-cases.md     — manual QA log
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
```

---

## 9. Setup & Local Development

```bash
git clone https://github.com/M-gatwiri/northstar-support-deflection-mvp.git
cd northstar-support-deflection-mvp
npm install
npm run dev        # local dev server, hot reload
npm run build       # production build
npm run preview     # serve the production build locally
npm run lint         # ESLint
```

Requires Node.js (no version pinned in the repo — recommend adding an `.nvmrc` or `engines` field so future contributors match the version the MVP was built and deployed with).

---

## 10. Deployment

Live at **northstar-support-deflection-mvp.vercel.app**, deployed via Vercel, almost certainly auto-deploying from pushes to `main` (standard Vercel/GitHub integration — worth confirming and documenting explicitly in Vercel's project settings, since that's currently tribal knowledge rather than written down anywhere in the repo).

---

## 11. Team & Collaboration Model

Built by a five-person team (Development, Product/Project Management, UI/UX, QA/Testing, Documentation) as part of the Northstar Sprint simulation. Git workflow: pull before starting work, communicate before pushing to `main`, commit messages follow `<type>: <what changed> - <why it matters>`. Full detail is in the README and is still accurate — not duplicated here.

---

## 12. Known Limitations & Technical Debt

These are the gaps between "working demo" and "production system," in rough order of importance:

1. **No real backend.** All 10 orders are hardcoded in `orders.js`. There is no API, no database, and no way for this to reflect a real customer's real order without a developer editing and redeploying code.
2. **No customer identity check.** Anyone who knows or guesses a valid order number (`NS1001`–`NS1010`) can see that order's full status. There's no login, session, or verification tying a lookup to the person making it. This is a real privacy gap if connected to real customer data.
3. **Hardcoded, non-computed dates.** Delivery dates are fixed strings, not calculated from a real timestamp — they will silently go stale.
4. **`docs/decision-log.md` is empty.** The file exists but no product/technical decisions have been recorded in it, so there's no written trail of *why* things were built the way they were.
5. **No deflection measurement.** The stated goal is reducing support tickets, but there's no analytics or event tracking in the app to actually measure whether it's working.
6. **No automated tests.** QA is a manually-run, manually-recorded checklist. There's no CI pipeline and no unit/integration test suite, so nothing currently prevents a future change from silently breaking a scenario in §7.
7. **Duplicated logic.** `OrderStatus.jsx` and `ReturnsRefunds.jsx` both reimplement the same lookup/trim/uppercase logic independently. Not a functional bug, but worth consolidating before adding a third feature (e.g. stock availability) the same way.
8. **Bleeding-edge dependencies.** React 19 and Vite 8 are both very recent major versions — fine today, but worth a periodic check that Vercel builds still succeed as the ecosystem moves.

---

## 13. Roadmap / Recommended Next Steps

Roughly in priority order:
1. Replace `orders.js` with a real API call (this is a contained change — both components already isolate the lookup into one function each).
2. Add a lightweight identity check before showing order details (even something simple, like requiring the order number *and* the postal code or email on file).
3. Fill in `docs/decision-log.md` going forward so future contributors have context.
4. Add basic analytics (e.g. "lookup succeeded," "lookup failed," "returned to menu") to actually measure deflection.
5. Build out Stock Availability, the third originally-scoped ticket category that didn't make it into this MVP.
6. Add a minimal automated test suite (even just the 14 existing manual cases, converted to Vitest/RTL) so regressions get caught before a human has to notice them.
7. Consider the rename to **Northstar QuickHelp** (or preferred alternative) across the repo name, page title, and Vercel project name for consistency once this moves toward a real launch.
