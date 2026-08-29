import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Heart,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import { loadArtworks, CATEGORIES } from "../data/artworks";
import { useFavorites } from "../context/FavoritesContext";

import "./../css/Gallery.css";

const categoryFilters = ["All", ...CATEGORIES];

function Gallery() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { isFavorite, toggleFavorite } = useFavorites();

  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    setArtworks(loadArtworks());
  }, []);

  const categoryFromUrl = searchParams.get("category");
  const searchFromUrl = searchParams.get("search");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl && categoryFilters.includes(categoryFromUrl)
      ? categoryFromUrl
      : "All"
  );

  const [sortBy, setSortBy] =
    useState("Featured");

  const [showFilters, setShowFilters] =
    useState(false);


  /* =====================================
     FILTER + SORT
  ====================================== */

  const filteredArtworks = useMemo(() => {
    let result = [...artworks];

    /* Search */

    if (searchFromUrl) {
      const query = searchFromUrl.toLowerCase();

      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(query) ||
          art.artist.toLowerCase().includes(query) ||
          art.category.toLowerCase().includes(query)
      );
    }

    /* Category */

    if (selectedCategory !== "All") {
      result = result.filter(
        (art) =>
          art.category === selectedCategory
      );
    }

    /* Sort */

    if (sortBy === "Featured") {
      result.sort(
        (a, b) =>
          Number(b.featured) -
          Number(a.featured)
      );
    }

    if (sortBy === "Newest") {
      result.sort(
        (a, b) => b.id - a.id
      );
    }

    if (sortBy === "Price Low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "Price High") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [artworks, selectedCategory, sortBy, searchFromUrl]);


  return (
    <main className="gallery-page">


      {/* =================================
          HERO
      ================================= */}

      <section className="gallery-intro">

        <span className="gallery-eyebrow">
          ARTS GALLERY / GALLERY
        </span>

        <h1>
          Discover Original Art
        </h1>

        <p>
          Explore original paintings and
          artworks created by independent
          artists. Find a piece that feels
          right for your space.
        </p>

      </section>


      {/* =================================
          CONTROLS
      ================================= */}

      <section className="gallery-controls">


        {/* CATEGORY */}

        <div className="gallery-categories">

          {categoryFilters.map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-pill active"
                  : "category-pill"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>


        {/* RIGHT CONTROLS */}

        <div className="gallery-sort-area">


          {/* FILTER MOBILE */}

          <button
            className="filter-button"
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >
            <SlidersHorizontal size={16} />

            Filters
          </button>


          {/* SORT */}

          <div className="sort-wrapper">

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option>
                Featured
              </option>

              <option>
                Newest
              </option>

              <option>
                Price Low
              </option>

              <option>
                Price High
              </option>
            </select>

            <ChevronDown
              size={15}
              className="sort-icon"
            />

          </div>

        </div>

      </section>


      {/* =================================
          MOBILE FILTER
      ================================= */}

      {showFilters && (

        <div className="mobile-filter">

          <p>
            Categories
          </p>

          <div>

            {categoryFilters.map((category) => (

              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "filter-pill active"
                    : "filter-pill"
                }
                onClick={() => {
                  setSelectedCategory(
                    category
                  );

                  setShowFilters(false);
                }}
              >
                {category}
              </button>

            ))}

          </div>

        </div>

      )}


      {/* =================================
          RESULT COUNT
      ================================= */}

      <div className="gallery-result">

        <span>
          {filteredArtworks.length} artworks
        </span>

        {selectedCategory !== "All" && (
          <span>
            / {selectedCategory}
          </span>
        )}

      </div>


      {/* =================================
          ARTWORK GRID
      ================================= */}

      <section className="artwork-grid">

        {filteredArtworks.map((artwork) => (

          <article
            className="artwork-card"
            key={artwork.id}
            onClick={() =>
              navigate(`/artwork/${artwork.id}`)
            }
          >


            {/* IMAGE */}

            <div className="artwork-image">

              <img
                src={artwork.image}
                alt={artwork.title}
              />


              {/* FEATURED */}

              {artwork.featured && (

                <span className="featured-badge">
                  Featured
                </span>

              )}


              {/* FAVORITE */}

              <button
                className={`favorite-button ${
                  isFavorite(artwork.id)
                    ? "liked"
                    : ""
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleFavorite(artwork);
                }}
                aria-label="Add to favorites"
              >

                <Heart
                  size={18}
                  fill={
                    isFavorite(artwork.id)
                      ? "currentColor"
                      : "none"
                  }
                />

              </button>

            </div>


            {/* DETAILS */}

            <div className="artwork-details">

              <div className="artwork-heading">

                <div>

                  <h2>
                    {artwork.title}
                  </h2>

                  <p>
                    {artwork.artist}
                  </p>

                </div>

                <strong>
                  ₹
                  {artwork.price.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              <div className="artwork-bottom">

                <span>
                  {artwork.category}
                </span>

                <button
                  className="view-artwork"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/artwork/${artwork.id}`);
                  }}
                >
                  View
                  <ArrowRight size={15} />
                </button>

              </div>

            </div>

          </article>

        ))}

      </section>


      {/* =================================
          EMPTY
      ================================= */}

      {filteredArtworks.length === 0 && (

        <div className="gallery-empty">

          <h2>
            No artworks found
          </h2>

          <p>
            Try another category.
          </p>

          <button
            onClick={() =>
              setSelectedCategory("All")
            }
          >
            View all artworks
          </button>

        </div>

      )}

    </main>
  );
}

export default Gallery;
