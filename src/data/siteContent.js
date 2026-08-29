// ==========================================
// SITE CONTENT
// Editable copy + images for Home page sections
// (Hero, Artist). Managed from Admin > Site Content.
// ==========================================

const CONTENT_KEY = "ak-arts-site-content";

const defaultContent = {
  hero: {
    label: "ARTS GALLERY",
    title: "Art that brings\nemotion to your space.",
    description:
      "Discover original artworks or turn your favorite memory into a beautiful piece of art.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg?width=900",
  },
  artist: {
    label: "FEATURED ARTIST",
    name: "Featured Artist",
    bio: "A contemporary artist known for creating expressive landscapes and paintings inspired by nature, light, and everyday life.",
    bioSmall:
      "Their work combines traditional techniques with a personal and modern artistic style.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Great_Wave_off_Kanagawa2.jpg?width=850",
  },
};

export function loadSiteContent() {
  const raw = localStorage.getItem(CONTENT_KEY);

  if (raw) {
    try {
      const parsed = JSON.parse(raw);

      // Merge with defaults so new fields introduced
      // later don't break older saved content.
      return {
        hero: { ...defaultContent.hero, ...parsed.hero },
        artist: { ...defaultContent.artist, ...parsed.artist },
      };
    } catch {
      // fall through and reseed if corrupted
    }
  }

  localStorage.setItem(CONTENT_KEY, JSON.stringify(defaultContent));
  return defaultContent;
}

export function saveSiteContent(content) {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
}
