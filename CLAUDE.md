# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

테토-에겐 (Teto-Egen) is a viral Korean personality-quiz web app. A user picks gender + age, answers ~25 situational questions, and gets a "teto vs egen" hormone-personality result with compatibility/career/celebrity/health/growth sections. Bilingual (ko/en). Live at https://spungs-teto-egen.com.

## Stack & tooling

- **Pure static site**: vanilla HTML/CSS/ES6+. No framework, **no `package.json`, no build step, no bundler, no tests, no linter.** Editing a file = changing production.
- **Deployment**: GitHub Pages (`spungs.github.io/teto-egen-test`) with custom domain via `CNAME`. Push to `main` → live. There is no CI.
- **Backend**: Supabase REST (visitor counter + version string only). External libs loaded via CDN: `html2canvas` (image export), GA4/GTM (analytics), AdSense/AMP auto-ads.

## Running locally

You **must serve over HTTP** — opening `index.html` via `file://` breaks the app, because `header.js`/`footer.js` use `fetch()` to inject `header.html`/`footer.html`, and `file://` blocks fetch.

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

The visitor counter auto-disables on `localhost`/`127.0.0.1`/LAN IPs (see `VisitorCounter.isLocalEnvironment` in `js/footer.js`), so local runs don't pollute stats.

## Architecture

Multi-page static site. Each page (`index.html`, `about.html`, `guide.html`, `privacy-policy.html`) injects a shared `header.html` + `footer.html` at runtime via fetch.

**Script load order matters** and is fixed in each HTML file:
`header.js → translations.js → common.js → config.js → footer.js → teto-data.js → script.js`

Everything is **global-scope** (no modules/imports). Files communicate through globals: `currentLanguage` (common.js), `questionData`/`resultData` (teto-data.js), `translations` (translations.js), `config` (config.js). Cross-file calls are guarded with `typeof X !== 'undefined'` / `typeof fn === 'function'`.

| File | Responsibility |
|------|----------------|
| `js/script.js` | Test flow only (the quiz on index.html). 3-screen state machine (`start`/`test`/`result`), scoring, result rendering. |
| `js/teto-data.js` | All quiz content: `questionData` + `resultData`. This is what you edit to change questions/results. |
| `js/common.js` | Shared across all pages: `currentLanguage` global, i18n (`updateLanguage`/`toggleLanguage`), clipboard share, save-result-as-image (`html2canvas`), browser-language auto-detect. |
| `js/translations.js` | UI string table `translations.ko` / `translations.en` (applied to `[data-text]` elements + hardcoded selectors in `updateLanguage`). |
| `js/header.js` | Fetch+inject `header.html`, set active nav, load version string from Supabase. |
| `js/footer.js` | Fetch+inject `footer.html`, `VisitorCounter` class (Supabase `daily_visitors`/`visitor_stats`), "other services" links. |
| `js/config.js` | Supabase URL + anon key. |

**Timing hack**: header/footer are injected asynchronously, so `script.js` and `common.js` defer init with `setTimeout(..., 100)` after `DOMContentLoaded`. If you touch initialization order, preserve this — code that queries injected DOM before injection will silently no-op.

## Quiz data model (`js/teto-data.js`)

Content is fully data-driven — adding/editing questions and results needs **no changes to `script.js`**.

**`questionData`** has six arrays, keyed by language and gender:
- Base (shown to everyone): `ko`, `en`
- Gender-specific (appended after base): `ko_male_specific`, `ko_female_specific`, `en_male_specific`, `en_female_specific`

`script.js` builds the active quiz as `[...base, ...genderSpecific]` for the current language+gender, so total question count is **dynamic** (the `20` in `index.html` is just a placeholder, overwritten at runtime).

Each question: `{ situation: string, options: [...] }`. `options` is either a flat array **or** `{ male: [...], female: [...] }` for gender-specific answer choices within a shared question. Each option: `{ text, type: 'teto' | 'egen' | 'balanced', score }`.

**Scoring** (`recalculateScores`): `teto`/`egen` add `score` to their tally; `balanced` adds `score * 0.5` to both. Scores are recomputed from the whole `answers` array each time, which is what makes the back button work. Final type: higher tally wins, but a `<10%` gap is treated as a near-tie (`tetoScore >= egenScore`).

**`resultData`** is nested `[lang][gender][teto|egen]`, each result an object with:
`type`, `emoji`, `traits[]`, `description`, `tetoLabel`, `egenLabel`, `compatibility[{type, emoji, reason}]`, `careers[]`, `celebrities[{name, profession}]`, `health.{exercise[], diet[], stress[]}`, `growth[{icon, title, description}]`.
The matching `render*` functions in `script.js` consume these shapes — keep keys in sync when editing. Compatibility **percentages are computed at runtime** (`calculateCompatibilityScore`, Helen-Fisher-style opposite-attracts), not stored.

## Gotchas

- **`config.js` is gitignored but force-committed** (`git add -f`) so GitHub Pages can serve it (commit `64edece`). The Supabase key in it is a **public anon key** — protect data with Supabase RLS, never put a service-role key here. After editing `config.js` you must `git add -f js/config.js` to commit it.
- **GA4/GTM events** are pushed to `window.dataLayer` in `script.js`: `test_start`, `test_complete` (with `result_type`/`gender`/`age`/scores), `test_reset`. Keep these names stable — dashboards depend on them.
- Adding a sibling test page (the planned `love-test.html`): reuse this structure — clone the page, swap in a new `js/love-data.js`, keep the same script-load order and shared header/footer.
- Edits to copy/results often need parallel ko + en updates, and gender-specific arrays come in male/female pairs. Don't update one language/gender and leave the other stale.

## Status

`REFACTORING_PROGRESS.md` tracks the roadmap (Phase 1 refactor done; Phase 2 = add `love-test.html`). `README.md` is the user-facing service description.
