export type GuideSection = {
  heading: string;
  paragraphs: readonly string[];
  checklist?: readonly string[];
};

export type Guide = {
  description: string;
  eyebrow: string;
  intro: string;
  publishedDate: string;
  readTime: string;
  sections: readonly GuideSection[];
  slug: string;
  title: string;
};

export const guides: readonly Guide[] = [
  {
    slug: "how-to-make-a-travel-photo-book",
    title: "How to Make a Travel Photo Book",
    description:
      "A practical, step-by-step guide to turning family trip photos into a travel photo book with a clear story, useful captions, maps, and a personal cover.",
    eyebrow: "Travel photo book guide",
    intro:
      "A family trip rarely arrives in your camera roll as a tidy story. It shows up as duplicate sunsets, screenshots, portraits from three phones, blurry jokes, and a few photographs that instantly bring the whole week back. The job is not to save every image. It is to shape the right images into a book your family will want to open again.",
    publishedDate: "2026-08-01",
    readTime: "9 minute read",
    sections: [
      {
        heading: "1. Decide what story this book is telling",
        paragraphs: [
          "Start with one sentence: “This is the story of our first road trip through California,” or “This is the summer the cousins finally traveled together.” That sentence is your editing rule. It tells you which photos belong, what context a reader needs, and what can stay in the camera roll.",
          "For most family trips, chronological order is the clearest structure. Arrival, the first full day, the middle adventures, the unexpected detour, and the trip home already form a natural arc. A thematic structure can work for a longer journey: people, food, landscapes, small details, and favorite moments. Pick one structure before arranging pages so the book does not feel like a shuffled slideshow.",
        ],
        checklist: [
          "Write a one-sentence purpose for the book.",
          "Choose chronological or thematic organization.",
          "Name the person who will most often read it five years from now.",
        ],
      },
      {
        heading: "2. Gather everyone’s photographs before designing",
        paragraphs: [
          "Ask each traveler for their photos before you begin. Another phone may hold the only picture of you, a better angle of the birthday dinner, or the candid moment everyone remembers. Put the shared photos in one album and remove screenshots, accidental shots, and obvious duplicates before opening a book editor.",
          "Do not wait for a perfectly organized library. A first pass that removes clutter is enough. Keep alternate versions of an important family portrait until you can compare them on a larger screen. Delete from the working album, not from anyone’s photo library, so the process stays reversible.",
        ],
      },
      {
        heading: "3. Build a first draft before polishing pages",
        paragraphs: [
          "A rough book is easier to improve than an empty one. In Away We Go, Magic Builder creates a first draft from the trip photos you select. Taste Check and Cover Star turn two difficult decisions—what belongs and what leads—into quick photo games. Treat the result as a starting point, then rearrange pages and photos until the sequence matches the trip you remember.",
          "At this stage, look for pacing rather than perfection. Give major moments more space. Let a quiet detail sit between two busy spreads. If six similar beach photos say the same thing, keep one wide scene, one family moment, and one small detail instead of making every page compete for attention.",
        ],
      },
      {
        heading: "4. Give each spread one clear job",
        paragraphs: [
          "Think in two-page spreads. One spread might establish a destination, another might hold the chaos of a market, and another might slow down for a single portrait. Photo grids are useful when a sequence matters—a child learning to snorkel, four courses from dinner, or the changing view from a train. A single-photo page is stronger when one image deserves a pause.",
          "Alternate dense and quiet pages. Repetition is useful when it creates rhythm, but not when every spread uses the same number and size of photos. Rearrange layouts, crop and frame images deliberately, and check that faces, hands, signs, and landmarks are not pushed into an awkward edge.",
        ],
      },
      {
        heading: "5. Add the details the camera could not record",
        paragraphs: [
          "A caption should supply memory, not restate the image. Write the name of the tiny restaurant, the phrase your child kept repeating, why the ferry ride became funny, or who took the photograph. Keep most captions short enough to scan while turning a page. Use a story page when a moment needs more room than a line or two.",
          "Maps and place-specific artwork help readers understand where the story happened. Away We Go supports custom maps and destination artwork for more than 250 places. Use those elements as chapter markers or pauses, not decoration on every page. The photos and family story should remain the main event.",
        ],
      },
      {
        heading: "6. Personalize the cover for the life of the book",
        paragraphs: [
          "A cover has two jobs: invite someone to pick up the book and identify it on a shelf. A clear title, destination, and year usually age well. Personalize it with a photo or destination artwork that still reads at a glance. Before ordering, view the cover small and check that the title does not compete with a busy background.",
          "Away We Go offers classic and premium softcover formats and a premium hardcover. Choose based on how the book will be used and where it will live. A family copy that children will flip through may invite a different choice from a commemorative gift for grandparents.",
        ],
      },
      {
        heading: "7. Make one final reader-focused pass",
        paragraphs: [
          "Read the finished draft from the cover to the last page without editing. Notice where you lose the thread, where two images repeat each other, and where a person or place appears without context. Check names, dates, captions, crop edges, and the first and last spread. Then ask one traveler to review only for factual mistakes and missing people.",
          "When the sequence feels complete, review the printed format and cover choice, then place the order. Away We Go handles printing and delivery after you finish the book. Save perfection for another project; this book succeeds when it brings the trip back to the people who were there.",
        ],
        checklist: [
          "Read every caption aloud once.",
          "Check crops around faces and important details.",
          "Confirm the cover title, destination, and year.",
          "Make sure each traveler appears somewhere appropriate.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-photos-for-a-travel-photo-book",
    title: "How to Choose Photos for a Travel Photo Book",
    description:
      "A repeatable way to choose family travel photos, remove duplicates, balance people and places, and create a book with strong pacing.",
    eyebrow: "Photo selection guide",
    intro:
      "Choosing photos is often harder than laying out the book. Every image can feel important when a trip is fresh, but a readable travel photo book needs contrast, pace, and enough empty space for its strongest moments to land. This method keeps the family story intact without asking you to rank every memory from scratch.",
    publishedDate: "2026-08-01",
    readTime: "8 minute read",
    sections: [
      {
        heading: "1. Create a separate working album",
        paragraphs: [
          "Copy possible book photos into a dedicated album. Include pictures from every traveler, then make all selection decisions inside that album. This separates curating from the emotional weight of deleting family photos and lets you change your mind safely.",
          "Keep the first pass broad. Add images that show a person, establish a place, capture an activity, preserve a small detail, or carry a story. The goal is to assemble the raw material, not make final cuts while scrolling through several camera libraries.",
        ],
      },
      {
        heading: "2. Remove technical misses and true duplicates",
        paragraphs: [
          "Begin with the easy decisions. Remove accidental frames, screenshots, obstructed lenses, severe motion blur, and exact duplicates. When several photos capture the same second, compare faces first, then focus, gesture, and background. Keep one lead image and, only when the sequence tells a story, one alternate.",
          "Near-duplicates are where books become crowded. Five versions of the same sunset do not create five times the feeling. Keep the version with the clearest shape, color, or human connection. If another version contains a meaningful reaction or changes the point of view, it may earn a place elsewhere in the sequence.",
        ],
      },
      {
        heading: "3. Sort by story role, not just image quality",
        paragraphs: [
          "A technically imperfect photo may be essential if it holds the only record of a joke, reunion, or first attempt. Give each candidate a role: scene setter, person, action, detail, transition, or ending. If a section contains ten scene setters and no people, the issue is balance rather than sharpness.",
          "Use strong landscape and street images to establish place, but let family members carry the emotional story. Include candid interactions as well as posed group shots. Food, tickets, signs, hotel-room views, muddy shoes, and drawings made during dinner can connect the landmark moments and make the book feel like your trip rather than a destination brochure.",
        ],
        checklist: [
          "Place: Where are we?",
          "People: Who was there?",
          "Action: What happened?",
          "Detail: What did it feel like?",
          "Story: What will need explaining later?",
        ],
      },
      {
        heading: "4. Make sure every person belongs in the story",
        paragraphs: [
          "Families often discover that the usual photographer barely appears. Check representation by person, not by an exact quota. Ask whether each traveler appears in a way that feels true to the trip. A candid, a shared activity, and one clear portrait often say more than a dozen posed lineups.",
          "Invite children to choose a few favorites. Their selections may favor the hotel pool, a strange snack, or a blurry animal over the landmark adults expected. Those choices reveal what the trip meant to them and can lead to captions that preserve their voice.",
        ],
      },
      {
        heading: "5. Choose anchors, then build around them",
        paragraphs: [
          "Select one anchor image for each major day, place, or chapter. An anchor is the photograph that can hold a full page or lead a spread. Once anchors are set, choose supporting photos that add information rather than repeat the same view.",
          "Away We Go’s Cover Star game can help compare candidates for the cover, while Taste Check helps narrow the overall set. After Magic Builder creates a first draft, look at the selections in context. An image that seemed ordinary in the camera roll may become a useful transition; a favorite may feel repetitive beside three similar photos.",
        ],
      },
      {
        heading: "6. Edit for page rhythm",
        paragraphs: [
          "Photo count is not the same as story value. A busy day can use a grid to show motion and variety. A quiet overlook may need one large image. Alternate wide views, medium scenes, portraits, and close details so the reader’s eye has somewhere new to go.",
          "If a spread feels crowded, remove the weakest supporting photo before shrinking everything. If it feels flat, look for contrast: people after scenery, action after posed portraits, or a small detail after a panoramic view. Rearranging pages and photos is part of selection, because sequence reveals which images are doing real work.",
        ],
      },
      {
        heading: "7. Use a final three-question test",
        paragraphs: [
          "For every uncertain photo, ask three questions: Does it add information? Does it add feeling? Would someone miss it if it disappeared? A photo that earns two yes answers probably belongs. One that earns none is using space another moment could use.",
          "Then review the book as a reader. Can someone understand where the family went, who shared the trip, what changed from beginning to end, and which moments mattered? Add captions or story pages where the image alone cannot answer. The finished selection should feel smaller than the camera roll but larger than a highlight reel: enough room for the trip’s personality to survive.",
        ],
        checklist: [
          "Remove repeated views before adding more layouts.",
          "Protect one or two anchor photos per chapter.",
          "Balance scenery, people, action, and small details.",
          "Keep an imperfect image when its memory is irreplaceable.",
        ],
      },
    ],
  },
] as const;

export type GuideSlug = (typeof guides)[number]["slug"];

export function findGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
