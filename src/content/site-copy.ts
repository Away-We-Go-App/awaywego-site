export const siteCopy = {
  name: "Away We Go",
  domain: "awaywegoapp.com",
  appStoreUrl: "https://apps.apple.com/us/search?term=Away%20We%20Go",
  supportEmail: "support@awaywegoapp.com",
  footerNote: "Made for wanderers.",
  shortDescription: "Your trip should be a coffee table book.",
  longDescription:
    "Away We Go turns your family trips into beautiful photo books that live in your home and not in your phone.",
  navLinks: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/support", label: "Support" },
  ],
  legal: {
    privacyIntro:
      "We keep the information needed to run Away We Go, support your account, and deliver the product experience you choose to use.",
    termsIntro:
      "Away We Go is consumer software for preserving travel memories and turning them into keepsakes, and these terms set the ground rules for using it.",
    supportIntro:
      "If you need help with Away We Go, send a note and we will reply as soon as we can.",
  },
} as const;
