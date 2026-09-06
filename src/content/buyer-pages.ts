export type BuyerPageLink = {
  description: string;
  href: string;
  label: string;
};

export type BuyerPageExample = {
  copy: string;
  heading: string;
  label: string;
};

export type BuyerPageProductExample = {
  alt: string;
  caption: string;
  src: string;
};

export type BuyerPageFaq = {
  answer: string;
  question: string;
};

export type BuyerPageSection = {
  checklist?: readonly string[];
  example?: BuyerPageExample;
  heading: string;
  paragraphs: readonly string[];
};

export type BuyerPage = {
  ctaCopy: string;
  ctaHeading: string;
  description: string;
  eyebrow: string;
  faqs: readonly BuyerPageFaq[];
  intro: string;
  productExample?: BuyerPageProductExample;
  relatedLinks: readonly BuyerPageLink[];
  reviewedDate: string;
  sections: readonly BuyerPageSection[];
  slug: string;
  title: string;
};

export const buyerPages: readonly BuyerPage[] = [
  {
    slug: "honeymoon-photo-books",
    title: "Honeymoon Photo Books",
    description:
      "Make a honeymoon photo book with a thoughtful arc, personal captions, and a cover that brings the whole trip back at a glance.",
    eyebrow: "A travel book for two",
    intro:
      "Select the honeymoon photos you want on your iPhone, let Magic Builder make a first draft, then edit captions, maps, and the cover before previewing the book for printing.",
    reviewedDate: "2026-09-05",
    faqs: [
      {
        question: "Is Away We Go an iPhone app?",
        answer:
          "Yes. Choose the honeymoon photographs on your iPhone, start a draft, and shape the book from there.",
      },
      {
        question: "How much of the honeymoon book can I customize?",
        answer:
          "You can rearrange pages and photos, choose grids, add captions and story pages, adjust crops and frames, add maps or destination artwork, and personalize the cover.",
      },
      {
        question: "What happens before the honeymoon book is printed?",
        answer:
          "Review the book, choose a classic or premium softcover or a premium hardcover, and use the preview to check the story before printing and delivery.",
      },
    ],
    sections: [
      {
        heading: "Choose the feeling before you choose the photos",
        paragraphs: [
          "Write one sentence that describes what you want to remember: “We learned how to slow down together in Lisbon,” or “Our first week as a married couple moved from busy streets to quiet water.” That sentence gives the edit a point of view. It also keeps the book from becoming a catalogue of landmarks where the two of you disappear behind the scenery.",
          "A simple honeymoon story often moves through arrival, discovery, a shared ritual, one surprise, and the journey home. The order can be chronological or emotional, but decide before you begin arranging pages. When a photograph is beautiful but does not support the sentence, save it for another album.",
        ],
        checklist: [
          "Name the feeling you want the book to bring back.",
          "Choose a chronological or emotional sequence.",
          "Set aside photographs you love but that belong to a different story.",
        ],
      },
      {
        heading: "Edit for the relationship, not just the destination",
        paragraphs: [
          "Begin with a wide view that establishes where you are, then look for the photographs that show how you were there together. A hand reaching across a café table, a tired face on a train, the shoes left by the door, and the imperfect picture from a windy lookout can carry more memory than another flawless postcard view.",
          "Check the balance between the two of you. If one person took most of the photographs, ask what is missing and look for shared images, reflections, timers, or photographs made by someone else. Keep a technically imperfect frame when it preserves a gesture or a line you would otherwise forget.",
        ],
        example: {
          label: "A useful edit",
          heading: "One place, three kinds of memory",
          copy: "For one day in the book, pair a scene setter of the old town with a photograph of the two of you doing something there and a small detail that only makes sense later: a pastry, a ticket, or the note on the room door.",
        },
      },
      {
        heading: "Build a six-part arc that leaves room to breathe",
        paragraphs: [
          "A honeymoon does not need a chapter for every hour. Give each section a job: arriving, finding your rhythm, seeing the place, handling a change of plan, enjoying one slow moment, and coming home. This creates enough shape for a reader to follow without forcing every day to have the same number of pages.",
          "Use a photo grid when a sequence has energy—the first swim, a market walk, or a table filling with dinner. Give a single photograph space when it carries the emotional turn. Alternating crowded and quiet spreads makes the book feel like a memory rather than a phone gallery.",
        ],
        checklist: [
          "Arrival: what did the place feel like at first?",
          "Rhythm: what small ritual became yours?",
          "Turn: what changed or surprised you?",
          "Return: what did you bring home besides souvenirs?",
        ],
      },
      {
        heading: "Write captions that sound like the two of you",
        paragraphs: [
          "The strongest captions add the part of the moment a photograph cannot show. Name the decision you almost made, the phrase that became a joke, the meal you ordered twice, or why the least polished picture is the one you would keep. A sentence in your own voice will age better than a generic description of a landmark.",
          "Keep most captions short and save the fuller story for one or two story pages. If you are unsure where to begin, use a prompt: “We did not expect…”, “The part nobody saw was…”, “This was the morning when…”, or “We will know this is our book because…”. Our guide to travel photo book captions and story prompts has more ways to turn a detail into a memory.",
        ],
      },
      {
        heading: "Let the cover identify the beginning of your life together",
        paragraphs: [
          "A honeymoon cover should be legible when the book is on a shelf. A destination, year, and short title are enough to locate the memory later. Choose a photograph or destination artwork with calm space for type, then check the cover at a small size so the words do not vanish into the background.",
          "Inside Away We Go, you can start with the photographs you select, respond to a first draft from Magic Builder, rearrange pages and photos, and add captions, story pages, maps, crops, and frames. Taste Check and Cover Star can help with early choices while the final sequence remains yours.",
        ],
      },
      {
        heading: "Move from a first draft to a printed book",
        paragraphs: [
          "When the story is clear, choose the honeymoon photographs on your iPhone and let Magic Builder create a starting point. Read the book as a couple, move any page that breaks the emotional sequence, and remove repeated views before you spend time polishing captions. Add a custom map or destination artwork when it gives the reader useful orientation.",
          "Before ordering, review the finished book, personalize the cover, and choose between the available classic or premium softcover formats and premium hardcover. Use the preview before printing and delivery to check names, crops, and the moments you most want to keep.",
        ],
      },
    ],
    relatedLinks: [
      {
        href: "/travel-photo-books",
        label: "Travel photo books for family trips",
        description: "See the full photo-to-book workflow and the choices Away We Go supports.",
      },
      {
        href: "/guides/travel-photo-book-captions-and-story-prompts",
        label: "Travel photo book captions and story prompts",
        description: "Find prompts for the details that do not fit inside the photograph.",
      },
      {
        href: "/guides/how-to-make-a-travel-photo-book",
        label: "How to make a travel photo book",
        description: "Use a practical sequence from photo shortlist to final reader pass.",
      },
      {
        href: "/iphone-travel-photo-books",
        label: "iPhone travel photo books",
        description: "Learn how to move from a single trip album to a first draft on iPhone.",
      },
    ],
    ctaHeading: "Give the first trip of your marriage a place to live.",
    ctaCopy:
      "Download Away We Go for iPhone, choose the photographs that feel like the two of you, and shape the first draft into a honeymoon book you will recognize years from now.",
  },
  {
    slug: "iphone-travel-photo-books",
    title: "iPhone Travel Photo Books",
    description:
      "Learn how to turn iPhone travel photos into a readable photo book with a focused album, a first draft, captions, and a personal cover.",
    eyebrow: "The camera roll is the starting point",
    intro:
      "Select photos from one trip on your iPhone, let Magic Builder make a first draft, then edit pages, captions, maps, and the cover before previewing the book for printing and delivery.",
    reviewedDate: "2026-09-05",
    faqs: [
      {
        question: "What iPhone do I need to use Away We Go?",
        answer:
          "Away We Go requires iOS 18 or later. Start with the photographs you want to use rather than moving your whole camera roll.",
      },
      {
        question: "Can I change the book after Magic Builder makes a draft?",
        answer:
          "Yes. Rearrange pages and photos, choose grids, add captions and story pages, adjust crops and frames, add maps or destination artwork, and personalize the cover.",
      },
      {
        question: "What printed formats are available?",
        answer:
          "Away We Go offers a classic softcover, a premium softcover, and a premium hardcover. Preview the finished book before printing and delivery.",
      },
    ],
    productExample: {
      src: "/marketing/onboarding-product-book-builder.png",
      alt: "Example Away We Go book draft shown in the app",
      caption:
        "Example book draft in Away We Go: a first draft is a starting point for your own edits.",
    },
    sections: [
      {
        heading: "Make and edit the book on your iPhone",
        paragraphs: [
          "Away We Go is built for making a travel photo book from your iPhone. Choose the photographs for one trip, let Magic Builder create a first draft, then rearrange pages and photos, add grids, captions, story pages, maps, artwork, crops, frames, and a personalized cover. Review the finished book before choosing a classic or premium softcover or premium hardcover for printing and delivery.",
          "Start with a dedicated album for the trip and gather photographs from every person who wants to contribute. Give the album a useful name—destination and year is enough—so you can find it again when the trip is no longer recent. Make your book decisions inside this working album and leave the original library untouched; a reversible edit is easier to trust.",
        ],
        checklist: [
          "Choose a focused album for one trip.",
          "Let Magic Builder make the first draft.",
          "Preview the book before printing and delivery.",
          "Choose the printed format after the story reads well.",
        ],
      },
      {
        heading: "Use story roles to escape the endless scroll",
        paragraphs: [
          "Give each candidate a role: scene setter, person, action, detail, transition, or ending. This changes the question from “Is this my favorite?” to “What work does this image do?” A technically ordinary photograph may be the only one that shows who was holding the map or what the weather did to the plan.",
          "Choose one anchor for each major day or stop, then add supporting photographs that provide new information. If three images show the same view, keep the one with the clearest gesture, expression, or sense of place. A smaller set with contrast will make the later layout decisions much easier.",
        ],
        example: {
          label: "A camera-roll shortcut",
          heading: "The 1–2–1 check",
          copy: "For each stop, look for one wide view, two photographs with people or action, and one close detail. The ratio is a prompt rather than a quota; it simply keeps the book from becoming all scenery or all selfies.",
        },
      },
      {
        heading: "Let the first draft show you what is missing",
        paragraphs: [
          "Away We Go’s Magic Builder creates a first draft from the photographs you select. That draft is useful even when it is not finished: it exposes repeated views, quiet gaps, and the days that have too many images competing for attention. Taste Check and Cover Star make two early decisions more playful, but they do not replace your knowledge of the trip.",
          "Respond to the draft in order. Fix the sequence first, then the photo choices, then the layout, then the words. Rearrange pages and photos, use grids for sequences, and give a single image room when it carries the turn in the story. A crop or frame adjustment should clarify the moment, not rescue a page that has too many ideas.",
        ],
      },
      {
        heading: "Add the context your iPhone could not record",
        paragraphs: [
          "A phone can preserve a face and a place, but it cannot explain why everyone was laughing or what changed after the photograph. Add short captions for names, sounds, food, weather, and running jokes. Use a story page when a turning point needs more than one sentence. Our captions and story prompts guide gives a practical set of questions for this pass.",
          "Custom maps and destination artwork can give a multi-stop trip a sense of geography. Use them as a chapter break or a moment of orientation. Artwork for more than 250 destinations is available in Away We Go, but the map or illustration should support the photographs rather than become the subject of every spread.",
        ],
      },
      {
        heading: "Design for the way the book will be read",
        paragraphs: [
          "Look at the book as a sequence of page turns. Follow a busy grid with a quieter image. Move from a wide scene to a close detail. Check that faces, hands, signs, and important edges survive the crop. A good layout gives the eye a next place to go and gives the strongest memory enough space to land.",
          "The cover only needs to answer three questions quickly: whose trip is this, where did it happen, and when? A destination, year, short title, and one strong image are usually enough. Keep the type readable at the scale of a shelf, then do a final reader pass before choosing the format.",
        ],
      },
      {
        heading: "Your iPhone workflow can end in a printed book",
        paragraphs: [
          "Once the sequence feels right, review the book from cover to last page. Away We Go lets you adjust pages, photos, grids, captions, story pages, crops, frames, maps, artwork, and the cover after the first draft. That combination keeps the starting work light while leaving the meaningful decisions in your hands.",
          "Away We Go offers classic and premium softcover formats and a premium hardcover, with a preview before printing and delivery. Choose the format after you know how the book reads, then use the preview to check the details that matter: names, faces, dates, and the page where the trip says goodbye.",
        ],
      },
    ],
    relatedLinks: [
      {
        href: "/travel-photo-books",
        label: "Travel photo books for family trips",
        description: "See how a selected camera roll becomes a personal printed story.",
      },
      {
        href: "/guides/how-to-choose-photos-for-a-travel-photo-book",
        label: "How to choose photos for a travel photo book",
        description: "Use a repeatable edit for duplicates, people, place, and pacing.",
      },
      {
        href: "/guides/travel-photo-book-captions-and-story-prompts",
        label: "Travel photo book captions and story prompts",
        description: "Add the sounds, jokes, and context your camera roll left out.",
      },
      {
        href: "/guides/how-to-make-a-road-trip-photo-book",
        label: "How to structure a road trip photo book",
        description: "Turn stops, route changes, and transition moments into chapters.",
      },
    ],
    ctaHeading: "Start with the trip that is already on your phone.",
    ctaCopy:
      "Download Away We Go for iPhone, make a working album for one journey, and turn the first draft into a book with your own pace, words, and cover.",
  },
] as const;

export type BuyerPageSlug = (typeof buyerPages)[number]["slug"];

export function findBuyerPage(slug: string) {
  return buyerPages.find((page) => page.slug === slug);
}
