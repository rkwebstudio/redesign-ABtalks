# ABTalks — Redesign

A mobile-first redesign of the ABTalks 60-day coding challenge product: landing page, student dashboard, and a single challenge day. Built with plain HTML/CSS/JS (no framework, no build step) so the three required routes work out of the box on any static host.

## Route Map

```
/
/dashboard
/day/12
```

## Stack

Plain HTML, CSS, and vanilla JS. No build step, no dependencies. Data is mocked in `js/mock-data.js` — there is no real backend, auth, or database, per the brief.

## Project structure

```
index.html            → /
dashboard/index.html  → /dashboard
day/12/index.html     → /day/12
css/style.css         → shared design system (tokens, components)
js/mock-data.js        → mocked students + task bank (stands in for a DB)
js/main.js              → shared behaviors (scroll reveal, count-up, heatmap builder, toast)
js/dashboard.js         → dashboard rendering + state switching
js/day.js                → challenge-day rendering + submission demo
```

## Design decisions

- **Mobile-first at 390px.** Everything was laid out for a single-column phone screen first; the desktop nav and multi-column grids are additive breakpoints, not the base layout.
- **Dark, deep-indigo base** rather than a bright theme — the brief notes students use this late at night; a dark UI is easier on the eyes and matches the "coding at 1am" context.
- **Streak heatmap** (a small commit-graph-style grid) is the one signature visual, reused in the hero, the dashboard, and the day page, so "progress" reads the same way everywhere.
- **Typography:** Space Grotesk for headings, Inter for body text, JetBrains Mono for streak counts, day numbers, and badges — the mono face nods to the audience without overdoing a "terminal" theme.

## The one thoughtful addition: Streak Shield

Missing a single day currently means losing the whole streak — which is discouraging enough that some students quit rather than restart. Streak Shield gives every student one automatic grace day per challenge: if a day is missed, the shield absorbs it and the streak continues, with a clear banner explaining what happened and that the shield has been used. This is visible in the "Missed day" demo state on `/dashboard`.

## Edge cases covered

All three are demonstrated live via the **demo state switcher** at the top of `/dashboard` (for evaluators — not part of the real product), and also handled directly in code:

- **First day, no streak** — `new` state: streak shows 0 with an encouraging message instead of a bare zero, all badges show as locked, and the public log shows an empty state explaining what will appear once Day 1 is submitted.
- **A missed day** — `missed` state (also the default on page load): the Streak Shield banner explains what happened; the streak number reflects the shield rather than resetting to 0.
- **An empty profile** — shown whenever `completedDays` is empty: avatar renders as a dashed placeholder instead of a broken image, and the badges/log sections explain what will fill them in.

## Running locally

Any static file server works, since the routes rely on folder-based `index.html` resolution:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:PORT/`, `/dashboard`, and `/day/12`.

## Deploying (clean routes, zero config)

**Vercel or Netlify** (recommended): drag-and-drop this folder, or connect the repo. Both resolve `/dashboard` and `/day/12` to the matching `index.html` automatically — no redirect rules needed.

**GitHub Pages**: works the same way, but GitHub Pages wants a trailing slash for directory routes (`/dashboard/`, `/day/12/`). If your evaluator's screenshot tool requests the exact paths without trailing slashes, prefer Vercel or Netlify.
