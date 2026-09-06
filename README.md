# Away We Go Site

Public website for Away We Go.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Tests

```bash
pnpm test:e2e
```

## Production

The production site is intended to live at `https://awaywegoapp.com`.

## Email app entry

Use `https://awaywegoapp.com/open` for an email's **Open the app** link. Keep
that destination direct: email click-tracking redirects can prevent iOS from
recognizing the associated domain. The AASA route includes `/open` and preserves
`/invite/*`. The fallback page offers the registered `awaywego://open` app scheme
and the App Store without an automatic redirect.

After deployment, verify the production AASA response and Apple's CDN, then test
a direct link from Mail on an iPhone with the released app installed. Association
refresh, browser choice, and the user's previous opening preference affect
universal links; a browser test alone cannot prove the installed app opens.
This entry opens the app without selecting a draft or applying a promo code.

Apple references: [Supporting associated domains](https://developer.apple.com/documentation/xcode/supporting-associated-domains)
and [Debugging universal links](https://developer.apple.com/documentation/technotes/tn3155-debugging-universal-links).
