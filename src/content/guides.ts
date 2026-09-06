export type GuideSection = {
  heading: string;
  paragraphs: readonly string[];
  checklist?: readonly string[];
  example?: {
    copy: string;
    heading: string;
    label: string;
  };
};

export type GuideLink = {
  description: string;
  href: string;
  label: string;
};

export type Guide = {
  description: string;
  eyebrow: string;
  intro: string;
  publishedDate: string;
  relatedLinks?: readonly GuideLink[];
  readTime: string;
  reviewedDate: string;
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
    reviewedDate: "2026-09-05",
    relatedLinks: [
      {
        href: "/guides/travel-photo-book-captions-and-story-prompts",
        label: "Travel photo book captions and story prompts",
        description: "Add the context and voice that photographs cannot carry alone.",
      },
      {
        href: "/guides/how-to-make-a-road-trip-photo-book",
        label: "How to structure a road trip photo book",
        description: "Use stops, route changes, and transitions as a chapter spine.",
      },
    ],
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
    reviewedDate: "2026-09-05",
    relatedLinks: [
      {
        href: "/iphone-travel-photo-books",
        label: "iPhone travel photo books",
        description: "Move from one focused trip album to a first draft on iPhone.",
      },
      {
        href: "/guides/travel-photo-book-captions-and-story-prompts",
        label: "Travel photo book captions and story prompts",
        description: "Write captions that preserve the details behind the image.",
      },
    ],
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
  {
    slug: "travel-photo-book-captions-and-story-prompts",
    title: "Travel Photo Book Captions and Story Prompts",
    description:
      "Use practical caption formulas and story prompts to add the voices, details, and turning points your travel photos cannot show alone.",
    eyebrow: "Caption and story guide",
    intro:
      "A photograph can show the table, the train window, or the face at the edge of the frame. It cannot tell the reader what happened five minutes earlier or why this ordinary detail became the memory everyone kept. These prompts help you write the missing context without turning every page into a diary entry.",
    publishedDate: "2026-09-05",
    reviewedDate: "2026-09-05",
    readTime: "7 minute read",
    relatedLinks: [
      {
        href: "/honeymoon-photo-books",
        label: "Honeymoon photo books",
        description: "Shape a two-person travel story with room for private jokes and shared rituals.",
      },
      {
        href: "/iphone-travel-photo-books",
        label: "iPhone travel photo books",
        description: "Move from one focused camera-roll album to a draft you can edit.",
      },
    ],
    sections: [
      {
        heading: "Start with what the photograph leaves out",
        paragraphs: [
          "A useful caption does not repeat the visible subject. It adds one piece of context: what you were trying to do, who was missing, what changed, or what you would forget without the picture. “The Colosseum at sunset” labels an image. “We found this view after taking the wrong bus and kept the detour” gives the image a place in the story.",
          "Write the first sentence quickly, in the words you would use when telling the story to someone who was there. You can polish spelling and length later. A specific verb, a small detail, and a reason the moment mattered will usually be enough.",
        ],
        checklist: [
          "What was happening just before the shutter?",
          "What detail would another traveler forget?",
          "What did this moment change about the day?",
        ],
      },
      {
        heading: "Use a simple caption formula",
        paragraphs: [
          "Try this three-part shape: action, detail, meaning. Action says what happened. Detail makes it yours. Meaning explains why it stayed with you. For example: “We stopped for one coffee, ordered three pastries, and decided this was our favorite morning.” The sentence is short, but it carries a choice, a sensory detail, and a feeling.",
          "Not every caption needs all three parts. A name, date, or place can be exactly the right amount of help. Use the formula when a page feels pretty but anonymous, then cut anything that sounds like a travel brochure.",
        ],
        example: {
          label: "Before and after",
          heading: "Turn a label into a memory",
          copy: "“Train to Kyoto” tells the reader where the photograph was made. “The train was quiet until we opened the snacks, then the whole row learned about the plum candy” records what the image cannot.",
        },
      },
      {
        heading: "Keep a prompt bank for different kinds of moments",
        paragraphs: [
          "Arrival prompts: What did you notice first? What looked different from home? What did you get wrong? These are useful for airport floors, hotel keys, first walks, and the photograph made before everyone had found the rhythm of the trip.",
          "People prompts: Who made this moment happen? What was someone saying, carrying, refusing, or learning? Detail prompts: What did you eat, hear, wear, or leave behind? Turning-point prompts: What changed the plan, and what did the change give you instead?",
          "Use one prompt per page, not all of them at once. The purpose is to unlock a precise memory, then get out of the way so the photograph can breathe.",
        ],
        checklist: [
          "Arrival: “The first thing we noticed was…”",
          "People: “You can tell this was us because…”",
          "Detail: “We still remember the sound/smell/taste of…”",
          "Turn: “The plan changed when…”",
          "Return: “We brought home…”",
        ],
      },
      {
        heading: "Give story pages a beginning, middle, and after",
        paragraphs: [
          "A story page earns its space when a moment needs more than a caption: a missed connection, a family tradition, a first attempt, or a day that looked ordinary until you remembered it later. Keep the structure simple. Begin with the expectation, describe the moment that interrupted it, and finish with what you understood afterward.",
          "For a family trip, ask different travelers for one sentence each. A child’s version of the hotel pool and a parent’s version of the same afternoon may disagree in the most useful way. Preserve the voice rather than smoothing every sentence into one narrator.",
        ],
      },
      {
        heading: "Edit captions for the reader who was not there",
        paragraphs: [
          "Read every caption beside its photograph, then read it without the photograph. If the sentence only makes sense while you are looking at the image, add the missing name, place, or action. If it explains everything and leaves no room for the picture, cut it back.",
          "Check proper names, dates, and pronouns. “She” may be obvious to you now and confusing to a future reader. A short caption can also be a kindness to the person who did not take the photograph; it lets them enter the moment without asking for the whole backstory.",
        ],
        checklist: [
          "Read it beside the image and on its own.",
          "Replace vague pronouns with a name when needed.",
          "Keep the family’s words where they carry the feeling.",
          "Cut explanations the image already handles.",
        ],
      },
      {
        heading: "Place the words after the page rhythm is clear",
        paragraphs: [
          "Make the first draft before writing every caption. Once the sequence is visible, you can see which pages need orientation, which moments deserve a line, and where a story page would slow the reader down in a good way. Away We Go lets you add captions and story pages after Magic Builder creates a starting point, alongside rearranging pages and photos, grids, crops, frames, maps, artwork, and the cover.",
          "When the words are finished, read the whole book aloud. Listen for repeated phrases, missing transitions, and the place where the story ends too abruptly. Then use the travel photo book workflow to review the cover, format, and final page before printing and delivery.",
        ],
      },
    ],
  },
  {
    slug: "how-to-make-a-road-trip-photo-book",
    title: "How to Structure a Road Trip Photo Book",
    description:
      "Build a road trip photo book with route chapters, stop-by-stop pacing, transition photos, maps, and captions that keep the journey moving.",
    eyebrow: "Road trip structure guide",
    intro:
      "A road trip already has a built-in story: leave, follow the route, change the plan, arrive somewhere new, and head home with a different sense of distance. A good book uses that movement without giving every fuel stop equal weight. Let the route provide the spine, then choose the people and details that make each stop yours.",
    publishedDate: "2026-09-05",
    reviewedDate: "2026-09-05",
    readTime: "8 minute read",
    relatedLinks: [
      {
        href: "/iphone-travel-photo-books",
        label: "iPhone travel photo books",
        description: "Create a focused trip album before you start shaping the draft.",
      },
      {
        href: "/guides/travel-photo-book-captions-and-story-prompts",
        label: "Travel photo book captions and story prompts",
        description: "Give route changes, roadside details, and family voices a place on the page.",
      },
      {
        href: "/travel-photo-books",
        label: "Travel photo books for family trips",
        description: "See the complete workflow from selected photos to a printed book.",
      },
    ],
    sections: [
      {
        heading: "Use the route as the book’s chapter spine",
        paragraphs: [
          "List the meaningful stops in order, then group them into a few chapters. A three-day drive might have chapters for leaving home, the long middle, and the place you turned around. A longer journey might use regions, landscapes, or changes in pace. The chapter names should help a reader understand where they are without making the book feel like a logbook.",
          "Choose one sentence for the whole journey: “We drove north to find cooler weather,” or “The route was supposed to be direct, but the detours became the trip.” Use it to decide whether a photograph advances the road story or belongs in a separate collection.",
        ],
        checklist: [
          "List stops in the order the traveler remembers them.",
          "Group stops by a meaningful change in place or pace.",
          "Write one sentence that explains why this route mattered.",
        ],
      },
      {
        heading: "Give each important stop the same basic rhythm",
        paragraphs: [
          "A repeatable stop structure makes a long route easy to follow: arrival, one scene setter, a person or action, one close detail, and the moment that sends you onward. You can compress a short stop to two photographs or expand a turning point across a spread. The structure is a way to notice what is missing, not a demand for equal page counts.",
          "A roadside attraction, a picnic table, and a grand viewpoint can all earn space when they show different parts of the trip. Avoid filling every stop with the same postcard view. The people waiting in the car, the snack eaten on the hood, and the muddy shoes may be the connective tissue between destinations.",
        ],
        example: {
          label: "A sample stop",
          heading: "Three photographs and one line",
          copy: "Open with the road sign, follow with the family at the overlook, end with the coffee cup on the dashboard, and caption the turn: “We planned twenty minutes and stayed until the light changed.” The sequence shows place, people, detail, and movement without crowding the spread.",
        },
      },
      {
        heading: "Use transition photos to make distance visible",
        paragraphs: [
          "Road trips are made of in-between moments. Keep a few photographs of changing weather, dashboard views, gas-station signs, packed back seats, bridges, and the road disappearing ahead. They give the reader a breath between destinations and make the journey feel traveled rather than teleported.",
          "Use transitions sparingly. One photograph can carry the move from coast to desert or city to open road. If several frames repeat the same horizon, keep the one that best signals a change in mood or geography.",
        ],
      },
      {
        heading: "Let maps orient the reader, then return to the people",
        paragraphs: [
          "A custom map can be a useful chapter break when the route covers several places. Pair it with a short line about the plan, the distance, or the detour. The map tells the reader where the trip moved; the photographs tell them what it felt like to be there.",
          "Destination artwork can also mark a new section, especially when the camera roll has fewer photographs at a stop. Use it to establish place and then let the next page return to a face, gesture, meal, or small object. The route is the structure, not the subject of every page.",
        ],
      },
      {
        heading: "Build a middle that changes pace",
        paragraphs: [
          "The middle of a road trip can feel repetitive if every day gets the same treatment. Look for the point where the trip changed: the weather turned, the children made a new game, the car took a wrong road, or the landscape opened up. Give that turn a quieter page or a story page so the book has a center of gravity.",
          "Use grids for a run of small observations—signs, snacks, motel rooms, or roadside color—and a single photograph for the view that stopped the car. A change in layout tells the reader that the journey has changed before the caption explains why.",
        ],
      },
      {
        heading: "End with what the road left behind",
        paragraphs: [
          "The final chapter does not need the biggest landscape. It needs a sense of return. Choose a last morning, an empty back seat, a familiar street, or the object that came home dusty. Pair it with a caption about what you noticed differently after the trip.",
          "Away We Go’s Magic Builder can make a first draft from the photographs you select. From there, rearrange pages and photos, add grids, captions, story pages, maps, crops, frames, and artwork, then personalize the cover. Read the full route in order before choosing a classic or premium softcover or premium hardcover and reviewing the preview before printing and delivery.",
        ],
      },
    ],
  },
] as const;

export type GuideSlug = (typeof guides)[number]["slug"];

export function findGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
