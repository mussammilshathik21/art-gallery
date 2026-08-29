import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { loadArtworks } from "../data/artworks";
import { useFavorites } from "../context/FavoritesContext";

import "../css/CategoryShowcase.css";

function CategoryShowcase() {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    setArtworks(loadArtworks());
  }, []);

  /*
    Group the shared artwork data by category so
    this section always matches Gallery / Admin.
  */
  const categories = useMemo(() => {
    const groups = {};

    artworks.forEach((artwork) => {
      if (!groups[artwork.category]) {
        groups[artwork.category] = [];
      }

      groups[artwork.category].push(artwork);
    });

    return Object.keys(groups).map((name) => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      artworks: groups[name],
    }));
  }, [artworks]);

  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) ||
    categories[0];

  const sliderRef = useRef(null);

  /*
    Move carousel one full visible section.
    Desktop:
    3 cards -> next 3 cards

    Tablet:
    2 cards -> next 2 cards
  */
  const slide = (direction) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;

    const amount = slider.clientWidth;

    slider.scrollBy({
      left:
        direction === "left"
          ? -amount
          : amount,

      behavior: "smooth",
    });
  };

  /*
    When category changes, return carousel
    to the beginning.
  */
  const changeCategory = (categoryId) => {
    setActiveCategoryId(categoryId);

    setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  if (!activeCategory) {
    return null;
  }

  return (
    <section className="category-showcase">

      {/* =========================
          SECTION HEADER
      ========================= */}

      <div className="category-header">

        <p className="category-label">
          EXPLORE OUR COLLECTION
        </p>

        <h2>
          Find Art That Speaks To You
        </h2>

        <p className="category-description">
          Explore original artworks created by talented
          artists across different styles and mediums.
        </p>

      </div>


      {/* =========================
          CATEGORY PILLS
      ========================= */}

      <div className="category-pills">

        {categories.map((category) => (

          <button
            key={category.id}
            className={
              activeCategory.id === category.id
                ? "category-pill active"
                : "category-pill"
            }
            onClick={() =>
              changeCategory(category.id)
            }
          >
            {category.name}
          </button>

        ))}

      </div>


      {/* =========================
          ARTWORK HEADER
      ========================= */}

      <div className="artwork-slider-header">

        <h3>
          {activeCategory.name}
        </h3>

        {/* Desktop / Tablet arrows */}

        <div className="slider-buttons">

          <button
            type="button"
            onClick={() => slide("left")}
            aria-label="Previous artworks"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => slide("right")}
            aria-label="Next artworks"
          >
            <ArrowRight size={18} />
          </button>

        </div>

      </div>


      {/* =========================
          ARTWORK CAROUSEL
      ========================= */}

      <div
        className="artwork-slider"
        ref={sliderRef}
      >

        {activeCategory.artworks.map(
          (artwork) => (

            <article
              className="artwork-card"
              key={artwork.id}
              onClick={() =>
                navigate(`/artwork/${artwork.id}`)
              }
            >

              {/* Image */}

              <div className="artwork-image-wrapper">

                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="artwork-image"
                />

                {/* Wishlist */}

                <button
                  type="button"
                  className="wishlist-button"
                  aria-label={`Add ${artwork.title} to wishlist`}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(artwork);
                  }}
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


              {/* Artwork Details */}

              <div className="artwork-info">

                <div className="artwork-details">

                  <h4>
                    {artwork.title}
                  </h4>

                  <p>
                    {artwork.artist}
                  </p>

                </div>

                <span className="artwork-price">
                  ₹{artwork.price.toLocaleString("en-IN")}
                </span>

              </div>

            </article>

          )
        )}

      </div>


      {/* =========================
          EXPLORE CATEGORY
      ========================= */}

      <div className="category-explore">

        <button
          type="button"
          onClick={() =>
            navigate(
              `/gallery?category=${encodeURIComponent(
                activeCategory.name
              )}`
            )
          }
        >

          Explore {activeCategory.name}

          <ArrowRight size={18} />

        </button>

      </div>

    </section>
  );
}

export default CategoryShowcase;
