# Away We Go SEO launch strategy

Status: implementation staged on August 1, 2026. Hosted setup and production observation remain human gates.

## Positioning and launch thesis

Away We Go should own a narrow, useful promise: turn family trip photos on an iPhone into a personal travel photo book with enough structure to get started and enough control to tell the family’s actual story.

The initial search wedge is not generic photo printing. It is the overlap of:

- high-intent travel photo book creation;
- the painful photo-selection and story-shaping jobs that happen before ordering;
- family trips, where people, captions, maps, and small details matter as much as scenery;
- a product workflow grounded in verifiable features: Magic Builder, Taste Check, Cover Star, movable pages and photos, photo grids, captions and story pages, crop and frame controls, custom maps, artwork for more than 250 destinations, personalized covers, three printed format tiers, printing, and delivery.

The site should answer the question before presenting the product. Every page needs a distinct intent, a practical takeaway, contextual links to the next useful page, and one clear App Store action.

## What comparable sites teach us

This review used current public pages from [Once Upon](https://onceupon.photo/en-us/travelbooks), [Chatbooks](https://chatbooks.com/blog/custom-travel-photo-albums), [Journi](https://www.journiapp.com/p/pb/tpb/), [Mixbook](https://www.mixbook.com/inspiration/how-to-create-the-perfect-travel-photo-book), [Popsa](https://popsa.com/perspectives/how-to-choose-meaningful-photos-for-a-photo-book/), and [Shutterfly](https://www.shutterfly.com/ideas/travel-photo-book-ideas/) on August 1, 2026. These are pattern observations, not copied language or product claims.

- Travel-specific landing pages convert a broad product into a clear use case. Away We Go’s pillar should stay centered on family trips, not become a catalog of every kind of photo book.
- Strong libraries answer adjacent jobs such as choosing photos, writing captions, picking layouts, organizing a trip, and creating a cover. Each answer links naturally to a product page and another guide.
- Destination and trip-type pages can scale, but only when they contain specific planning or storytelling value. Thin city pages would weaken the site; destination expansion begins only after Search Console shows real demand.
- The useful content mixes inspiration with a repeatable process. Checklists, examples, and decision rules are more defensible than generic lists of ideas.
- Product detail is strongest when placed at the point where it solves the reader’s current step. Maps belong in the storytelling section; grids belong in pacing; formats belong near the order decision.
- Established competitors cover large topic sets. Away We Go can be more coherent by maintaining one family-travel point of view and by describing first-draft-plus-personal-control honestly.

## Search intent and keyword clusters

Keywords are working hypotheses until Search Console supplies real query data. Do not buy a keyword tool for launch.

| Cluster | Primary intent | Initial page | Natural extensions |
| --- | --- | --- | --- |
| Travel photo books | Compare or start a product | `/travel-photo-books` | family vacation photo book, trip photo book, travel memory book |
| Make a book | Learn the full workflow | `/guides/how-to-make-a-travel-photo-book` | organize a travel photo book, travel book layout, travel book story |
| Choose photos | Reduce an overflowing camera roll | `/guides/how-to-choose-photos-for-a-travel-photo-book` | how many travel photos, remove duplicate vacation photos, family photo selection |
| Story and captions | Add meaning beyond images | Planned month 1 | travel photo book captions, family vacation story prompts |
| Trip formats | Find advice for a specific journey | Planned months 1–2 | family vacation, road trip, city break, multi-stop trip |
| Place and design | Decide how to represent location | Planned month 3 | travel photo book maps, destination cover ideas, place artwork |

Use Search Console query and page data weekly. When a page earns impressions for a closely related query but few clicks, improve its title, description, opening answer, and section coverage. When a new intent appears repeatedly and does not fit an existing page, add it to the editorial backlog. Search demand observed in the product’s own data outranks generic volume estimates.

## Editorial guardrails

- Write for a family member making a real book, not for a search crawler.
- State only current product facts. Recheck the App Store listing before each product-led update.
- Do not use unsupported superlatives, delivery geography, permanence claims, exact prices, or automation terminology absent from the listing.
- Keep advice reversible and respectful of personal photos. Never request or publish customer family images without explicit rights and consent.
- Give each page one primary intent. Consolidate overlapping drafts instead of publishing near-duplicates.
- Every article needs a descriptive title, a concise answer near the top, useful subheadings, contextual links, author/publisher identity, a published date, and a review date.
- Use original examples and prose. Competitor pages are research inputs, not copy sources.
- Update the typed guide registry and sitemap together through the shared route source. Validate structured data after material schema changes.

## Free measurement stack

| Tool | Role | Launch decision |
| --- | --- | --- |
| Google Search Console | Source of truth for indexing, queries, impressions, clicks, click-through rate, and average position | Primary; free |
| Bing Webmaster Tools | Secondary index coverage and query feedback; can import a verified Google property | Enable after launch; free |
| PostHog web analytics | Existing App Store tap measurement, with pageviews, page-leave, and Web Vitals staged separately | CTA event is live; expanded collection stays off until the gates below pass; free tier is sufficient |
| App Store Connect | App Store product-page views, downloads, conversion, and source reporting available to the account | Source of truth for installs; free with the developer account |
| PageSpeed Insights / Lighthouse | Lab performance and Core Web Vitals diagnostics | Run on release and monthly; free |
| Rich Results Test and Schema Markup Validator | Validate JSON-LD syntax and eligible types | Run on release and after schema edits; free |
| GA4 | Additional web analytics and advertising ecosystem integration | Defer; redundant for launch unless paid media or Google Ads requires it |

The production PostHog project token and host are already configured for the canonical `marketing:app_store_tap` event. The client keeps persistence disabled, sets `person_profiles: "never"`, and disables autocapture, session recording, exception capture, heatmaps, dead-click and rage-click capture, feature-flag requests, surveys, and external dependency loading. URL and referrer properties have query strings and fragments removed before sending; invite paths become `/invite/[code]`. The CTA event adds only the normalized route and a stable `cta_location`. Without `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, the SDK remains off.

History-aware pageviews, pageleave, and aggregate Web Vitals are independently staged behind `NEXT_PUBLIC_POSTHOG_WEB_ANALYTICS_ENABLED=true`. The flag is unset by default and absent in production, so this SEO change does not broaden live collection. Do not set `cookieless_mode: "always"` in code while the PostHog project is not accepting server-hash cookieless events; that would discard the existing CTA event. A future cookieless transition must coordinate the project setting, client configuration, privacy review, and event validation in one controlled change.

## Launch and hosted setup gates

Code can be merged independently of these gates because the existing CTA event does not broaden and the new web-analytics flag is off by default.

1. Deploy the reviewed SEO routes and verify `robots.txt`, `sitemap.xml`, canonical tags, metadata, status codes, structured data, and App Store links on the production domain.
2. The domain already had a Google verification TXT record during the August 1 preflight. Confirm the Search Console domain property is accessible, then submit `https://awaywegoapp.com/sitemap.xml` and request indexing for the home page, pillar, and two guides. The optional `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` hook should remain unset unless URL-prefix verification is specifically needed.
3. Add the property to Bing Webmaster Tools, preferably by importing the verified Google property, then submit the same sitemap.
4. Confirm the existing `marketing:app_store_tap` event still arrives after deploy with its normalized `route` and `cta_location`, no invite code or query string, no browser persistence, and no person profile.
5. Before enabling expanded web analytics, review and update the privacy policy so it describes the intended pageview, pageleave, and Web Vitals collection. This is a policy gate, not a code assumption.
6. Enable and confirm IP anonymization in the intended PostHog project. Keep raw project settings and tokens out of source and operational docs.
7. Set `NEXT_PUBLIC_POSTHOG_WEB_ANALYTICS_ENABLED=true` only in a non-production preview first. Verify one pageview, one pageleave, and Web Vitals event; confirm no cookies or local/session storage, no person profile, no invite code or query string, and no session replay/error events.
8. Promote the flag only after privacy approval and preview evidence. A future switch to server-hash cookieless mode is optional and must be coordinated with its matching client configuration and another event-delivery check.
9. Create a small PostHog dashboard for organic landing pages, App Store clicks by route and CTA location, click-through rate, and Web Vitals. Use App Store Connect for installs; do not infer an install from an outbound click.

## KPI definitions

| KPI | Definition | System of record |
| --- | --- | --- |
| Valid indexed pages | Submitted non-invite URLs indexed without canonical or crawl errors | Search Console |
| Organic impressions | Search result impressions for the site and target pages | Search Console |
| Organic clicks | Search result clicks to the site | Search Console |
| Organic click-through rate | Organic clicks divided by impressions, reviewed by query and page | Search Console |
| Qualified rankings | Queries with relevant intent reaching positions 1–20; not a count of every ranking term | Search Console |
| Organic App Store clicks | `marketing:app_store_tap` events from an organic landing session | PostHog after enablement |
| Website-to-App-Store rate | App Store CTA clicks divided by eligible landing sessions | PostHog after enablement |
| Attributed installs | Installs reported through an approved App Store campaign/source mechanism | App Store Connect; unavailable until attribution setup is confirmed |
| Content output | Two substantively reviewed new pieces per month plus updates driven by query data | Editorial log / git history |
| Legitimate referring domains | Relevant independent sites linking editorially; no purchased or bulk directory links | Search Console links plus manual review |
| Core Web Vitals | LCP, CLS, and INP at page and site level | Search Console field data; PostHog and Lighthouse for diagnosis |

## Operating rhythm

Weekly, in 30–45 minutes:

1. Check index coverage and sitemap errors.
2. Compare queries and landing pages over the latest 28 days versus the previous period, accounting for low-volume noise.
3. Record pages with growing impressions, weak click-through rate, or new relevant query variants.
4. Review App Store clicks and CTA locations after the SEO event properties deploy; add organic-session analysis only after expanded web analytics is approved.
5. Make one focused improvement: title/description, opening answer, missing section, internal link, or stale product fact.

Monthly, in 60–90 minutes:

1. Publish two useful pieces from the query-informed backlog.
2. Refresh one existing page rather than only adding URLs.
3. Run Lighthouse/PageSpeed and structured-data validation on the main templates.
4. Review earned links, App Store Connect acquisition, and the impression → click → App Store click → attributed install funnel without blending systems of record.
5. Reforecast the next 90 days from observed click-through and conversion rates.

## First 90 days

The launch set is the travel-photo-book pillar plus two detailed guides, supported by the guides index and homepage links. The publishing assumption is two strong new pieces per month.

| Window | New piece 1 | New piece 2 | Improvement / distribution work |
| --- | --- | --- | --- |
| Days 1–30 | Family vacation photo book ideas that preserve children’s voices and shared moments | Travel photo book caption and story-page prompts | Submit sitemap; ask a small set of relevant family-travel or photography partners for editorial feedback, not reciprocal link schemes |
| Days 31–60 | How to make a road trip photo book with chapters, route maps, and transition photos | How to organize iPhone travel photos before making a book | Update the initial guides from Search Console queries; add one original screenshot or diagram only when it clarifies a step |
| Days 61–90 | Travel photo book cover ideas using destination, year, family, photo, and artwork | How to use maps in a travel photo book without overwhelming the story | Consolidate overlapping queries; seek inclusion in a few relevant resource roundups or partner pages where the content genuinely helps |

Each new piece should link to the pillar, one sibling guide, and the App Store. The pillar or guides index should add a reciprocal link in the same change. By day 90, aim to have earned 2–5 legitimate referring domains through product relationships, original resources, or editorial mentions; this is an operating goal, not a purchase target.

## Conservative traction hypotheses

These ranges are hypotheses, not promises. They assume a new or thin domain, four meaningful non-legal launch surfaces, two strong new pieces each month, correct indexing, no major technical regressions, and 2–5 legitimate referring domains by month 3. Search demand, release timing, App Store conversion, seasonality, and domain history can move results outside the ranges.

| Month | Organic impressions | Organic clicks | App Store clicks | Attributed installs |
| --- | ---: | ---: | ---: | ---: |
| Month 1 | 100–500 | 5–30 | 1–10 | 0–3 |
| Month 2 | 500–2,000 | 20–100 | 3–25 | 1–8 |
| Month 3 | 1,500–6,000 | 60–300 | 10–75 | 2–25 |
| Month 6 | 6,000–25,000 | 250–1,250 | 40–300 | 10–100 |

Do not manage toward the midpoint as if it were a quota. The earliest signal is relevant impressions, followed by clicks and then App Store intent. If impressions remain below range, inspect indexing, query fit, content depth, and links. If impressions grow but clicks lag, work on titles and intent match. If organic visits grow but App Store clicks do not, improve product explanation and CTA placement. If App Store clicks grow but installs do not, investigate the App Store listing and attribution setup rather than rewriting search content blindly.

## Technical baseline and next cycle

The pre-change production Lighthouse 13.4.1 mobile run at `2026-08-01T08:02Z` scored 74 performance, 96 accessibility, and 100 SEO, with simulated LCP 8.4s, CLS 0.07, TBT 70ms, and Speed Index 3.0s. The homepage hero/video must not regress in this launch. LCP is the next technical optimization cycle: capture production field data, identify the LCP element and transfer/render breakdown, and test a low-risk asset-loading improvement without changing the hero or game experience. A build passing locally is not field-performance proof.
