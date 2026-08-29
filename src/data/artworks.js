// ==========================================
// SHARED ARTWORK DATA
// Single source of truth used by Home, Gallery,
// ArtworkDetails, CategoryShowcase and the
// Admin > Products dashboard.
//
// Persisted in localStorage so admin edits
// (add / edit / delete) survive a refresh.
// ==========================================

export const CATEGORIES = [
  "Oil Painting",
  "Watercolor",
  "Acrylic",
  "Sketch",
  "Portrait",
  "Landscape",
];

const defaultArtworks = [
  {
    id: 1,
    title: "Golden Landscape",
    artist: "Arun Kumar",
    category: "Oil Painting",
    price: 8500,
    size: "24 × 30 inches",
    year: "2026",
    type: "Original Artwork",
    featured: true,
    image: "https://picsum.photos/seed/ak-art-1/700/850",
    description:
      "A warm and expressive landscape painting inspired by the beauty of nature and golden evening light.",
  },
  {
    id: 2,
    title: "Silent Evening",
    artist: "Meena Arts",
    category: "Watercolor",
    price: 7200,
    size: "18 × 24 inches",
    year: "2026",
    type: "Original Artwork",
    featured: true,
    image: "https://picsum.photos/seed/ak-art-2/700/850",
    description:
      "A peaceful watercolor artwork capturing the calm atmosphere of a quiet evening.",
  },
  {
    id: 3,
    title: "Mountain Dreams",
    artist: "Rahul Art",
    category: "Oil Painting",
    price: 9800,
    size: "20 × 28 inches",
    year: "2026",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-3/700/850",
    description:
      "An expressive mountain landscape created with rich colors and detailed brushwork.",
  },
  {
    id: 4,
    title: "Old Village",
    artist: "Priya Artist",
    category: "Oil Painting",
    price: 6500,
    size: "22 × 26 inches",
    year: "2025",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-4/700/850",
    description:
      "A nostalgic depiction of an old village street rendered in warm earthy tones.",
  },
  {
    id: 5,
    title: "Blue Morning",
    artist: "Arun Kumar",
    category: "Watercolor",
    price: 4500,
    size: "16 × 20 inches",
    year: "2026",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-5/700/850",
    description:
      "A delicate watercolor study exploring soft blues and the stillness of early morning light.",
  },
  {
    id: 6,
    title: "Rainy Street",
    artist: "Meena Arts",
    category: "Watercolor",
    price: 5200,
    size: "18 × 22 inches",
    year: "2026",
    type: "Original Artwork",
    featured: true,
    image: "https://picsum.photos/seed/ak-art-6/700/850",
    description:
      "Reflections on a rain-soaked street, painted with loose, atmospheric watercolor washes.",
  },
  {
    id: 7,
    title: "Spring Garden",
    artist: "Rahul Art",
    category: "Watercolor",
    price: 3800,
    size: "14 × 18 inches",
    year: "2025",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-7/700/850",
    description:
      "A fresh, colorful garden scene celebrating the arrival of spring.",
  },
  {
    id: 8,
    title: "Color Dreams",
    artist: "Arun Kumar",
    category: "Acrylic",
    price: 6500,
    size: "20 × 24 inches",
    year: "2026",
    type: "Original Artwork",
    featured: true,
    image: "https://picsum.photos/seed/ak-art-8/700/850",
    description:
      "A bold, colorful acrylic piece built from layered brushwork and vivid contrast.",
  },
  {
    id: 9,
    title: "Abstract Life",
    artist: "Meena Arts",
    category: "Acrylic",
    price: 7500,
    size: "24 × 24 inches",
    year: "2026",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-9/700/850",
    description:
      "An abstract acrylic composition exploring movement, energy and emotion.",
  },
  {
    id: 10,
    title: "Red Horizon",
    artist: "Rahul Art",
    category: "Acrylic",
    price: 5800,
    size: "20 × 26 inches",
    year: "2025",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-10/700/850",
    description:
      "A striking horizon rendered in bold reds and deep contrast tones.",
  },
  {
    id: 11,
    title: "Portrait Study",
    artist: "Arun Kumar",
    category: "Sketch",
    price: 2500,
    size: "12 × 16 inches",
    year: "2026",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-11/700/850",
    description:
      "A refined graphite portrait study focused on light, shadow and expression.",
  },
  {
    id: 12,
    title: "The Face",
    artist: "Meena Arts",
    category: "Sketch",
    price: 3200,
    size: "14 × 18 inches",
    year: "2026",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-12/700/850",
    description:
      "An expressive charcoal sketch capturing subtle emotion in a single face.",
  },
  {
    id: 13,
    title: "Urban Lines",
    artist: "Rahul Art",
    category: "Sketch",
    price: 2800,
    size: "12 × 18 inches",
    year: "2025",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-13/700/850",
    description:
      "A confident line-based sketch of city architecture and urban rhythm.",
  },
  {
    id: 14,
    title: "Inner World",
    artist: "Kavin Studio",
    category: "Portrait",
    price: 6000,
    size: "18 × 24 inches",
    year: "2026",
    type: "Original Artwork",
    featured: true,
    image: "https://picsum.photos/seed/ak-art-14/700/850",
    description:
      "An intimate portrait exploring identity and quiet introspection.",
  },
  {
    id: 15,
    title: "Quiet Gaze",
    artist: "Priya Artist",
    category: "Portrait",
    price: 5400,
    size: "16 × 20 inches",
    year: "2025",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-15/700/850",
    description:
      "A soft, contemplative portrait rendered with gentle color transitions.",
  },
  {
    id: 16,
    title: "Green Valley",
    artist: "Arun Kumar",
    category: "Landscape",
    price: 4100,
    size: "20 × 24 inches",
    year: "2026",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-16/700/850",
    description:
      "A serene valley landscape painted in fresh greens and soft natural light.",
  },
  {
    id: 17,
    title: "Peaceful Lake",
    artist: "Priya Artist",
    category: "Landscape",
    price: 9200,
    size: "24 × 30 inches",
    year: "2026",
    type: "Original Artwork",
    featured: true,
    image: "https://picsum.photos/seed/ak-art-17/700/850",
    description:
      "A tranquil lakeside landscape capturing stillness and reflection.",
  },
  {
    id: 18,
    title: "Forest Dreams",
    artist: "Rahul Art",
    category: "Landscape",
    price: 6800,
    size: "20 × 28 inches",
    year: "2025",
    type: "Original Artwork",
    featured: false,
    image: "https://picsum.photos/seed/ak-art-18/700/850",
    description:
      "A dreamlike forest scene painted with rich texture and layered light.",
  },
];

const ARTWORKS_KEY = "ak-arts-artworks";

/* =========================================
   LOAD ARTWORKS
   Seeds localStorage on first run so the
   Admin dashboard can add/edit/delete.
========================================= */

export function loadArtworks() {
  const raw = localStorage.getItem(ARTWORKS_KEY);

  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fall through and reseed if corrupted
    }
  }

  localStorage.setItem(ARTWORKS_KEY, JSON.stringify(defaultArtworks));
  return defaultArtworks;
}

export function saveArtworks(artworks) {
  localStorage.setItem(ARTWORKS_KEY, JSON.stringify(artworks));
}

export function addArtwork(artwork) {
  const artworks = loadArtworks();

  const newId =
    artworks.length > 0
      ? Math.max(...artworks.map((a) => a.id)) + 1
      : 1;

  const updated = [...artworks, { ...artwork, id: newId }];

  saveArtworks(updated);
  return updated;
}

export function updateArtwork(id, updates) {
  const artworks = loadArtworks();

  const updated = artworks.map((a) =>
    a.id === id ? { ...a, ...updates, id } : a
  );

  saveArtworks(updated);
  return updated;
}

export function deleteArtwork(id) {
  const artworks = loadArtworks();
  const updated = artworks.filter((a) => a.id !== id);

  saveArtworks(updated);
  return updated;
}

export function getArtworkById(id) {
  return loadArtworks().find((a) => a.id === Number(id));
}
