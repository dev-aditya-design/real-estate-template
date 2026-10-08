# Aurevia Estates — premium real estate template

A reusable React + Vite real estate demonstration website with a fictional brand, navy and champagne styling, responsive layouts, six demonstration properties, URL-based filters and safe local enquiry previews.

## Run and validate

Use Node 24 (Vite requires Node 20.19+ or 22.12+).

```sh
npm ci
npm run dev
npm run build
npm test
```

`npm test` builds the production site and runs Playwright against Vite preview on port 5180. Tests use system Chromium when available. Otherwise run `npx playwright install chromium` first, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an installed Chromium binary.

## Pages

- `/` — Home
- `/properties` — All demonstration listings
- `/properties/:id` — Details for each demonstration property
- `/residential`, `/commercial`, `/plots-land` — Category pages
- `/about` — Fictional brand introduction
- `/contact` — Safe enquiry form and contact placeholders

Filters support location, property type, purpose and example budget. They intersect, persist in the URL, survive reloads and can be cleared. Category pages remain scoped to the selected category. Unknown pages and property IDs display a 404 page.

## Safe demonstration contacts

Aurevia Estates is fictional. Its display-only phone uses the reserved North American fictional range: **+1 (202) 555-0147**. Its email is **hello@aurevia.example**, under the reserved `.example` domain. There are no active telephone, email or WhatsApp links, and no real person's contact information or portrait.

All enquiry buttons open the internal enquiry demo; property buttons retain their demonstration listing context. The form validates name, phone number, preferred location, example budget, purpose and message. It accepts international phone formatting with 7–15 digits and an optional leading `+`.

After validation, users can review a plain-text message, copy it to their clipboard or download a UTF-8 text file. Clipboard failures provide manual-copy instructions. Editing the form removes the prepared preview until the user validates again. Form data exists only in React memory: it is never sent to a server, stored in local/session storage or placed in a URL. Reloading discards the form. Visitors should use example details when trying the template.

## Reuse and customization

1. Edit the fictional `business` configuration in `src/data.js` for the display name, initials, service area and contact placeholders. The header/footer branding and browser page titles use that configuration.
2. Edit `properties`, `categories`, `locations`, `budgets` and `purposes` in the same file. Property IDs must be unique, and category/location/budget/purpose values must match the filter options. Match the currency and budget categories to the intended market.
3. Replace imagery in `public/images/` with approved assets and update each property's `image` and `imageNote`. The plot and land SVGs are original demonstration illustrations, not site maps or surveys. Check rights and attribution for retained stock photographs before commercial use.
4. Update marketing copy in `src/main.jsx` and metadata in `index.html`. Adjust theme colors and typography in `src/styles.css`.
5. Run `npm test` after customizing. Tests exercise the listing data and real browsing/form behavior.

Every property is marked **Demonstration Listing**. Names, locations, photographs, artwork, prices/budget bands and property descriptions are illustrative. There are no verified approvals, availability, ownership claims, testimonials or invented credentials.

The default enquiry mode must remain preview-only until a real integration is deliberately implemented and tested. Replacing contact text does **not** activate calls or message delivery. For a live business, separately implement approved contact endpoints or a backend, consent/privacy handling and accurate delivery status; update both the disclosures and tests to match. Do not claim an enquiry has been sent or saved unless the integration actually does that.

## Test coverage

Browser checks cover navigation, 404s, all property details, images, demonstration labels, four-way filtering, URL persistence, category scoping, empty results, invalid/valid forms, property context, clipboard success/failure, UTF-8 downloads, no outgoing enquiry requests, and absence of live contact links. Responsive layouts and mobile menus are checked at 320, 390, 768, 1024 and 1440 pixels.

## Review and deployment

The changes are prepared locally on `feat/aurevia-estates-template` for review. They have not been pushed or deployed. Use `git diff` and `git status` to review both modified and newly added files, and `npm run dev` to inspect the site.

Build output is `dist/`. The included `vercel.json` provides the single-page-app fallback for React Router deep links. Deployment is a separate action requiring approval. Keep demonstration labels until real inventory and business details are authorized and independently verified.
