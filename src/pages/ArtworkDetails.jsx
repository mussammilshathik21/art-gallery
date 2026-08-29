import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
} from "lucide-react";

import { getArtworkById } from "../data/artworks";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

import "../css/ArtworkDetails.css";

function ArtworkDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [artwork, setArtwork] = useState(undefined);

  useEffect(() => {
    setArtwork(getArtworkById(id) || null);
  }, [id]);


  /* ================================
     LOADING
  ================================= */

  if (artwork === undefined) {
    return null;
  }


  /* ================================
     ARTWORK NOT FOUND
  ================================= */

  if (!artwork) {
    return (
      <main className="ad-not-found">

        <h1>
          Artwork not found
        </h1>

        <button
          onClick={() => navigate("/gallery")}
        >
          Back to Gallery
        </button>

      </main>
    );
  }


  /* ================================
     ADD TO CART
  ================================= */

  const handleAddToCart = () => {
    addToCart(artwork);
    navigate("/cart");
  };


  /* ================================
     BUY NOW
  ================================= */

  const handleBuyNow = () => {
    addToCart(artwork);
    navigate("/checkout");
  };


  return (
    <main className="ad-page">

      {/* ================================
          BACK
      ================================= */}

      <button
        className="ad-back"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={17} />

        Back
      </button>


      {/* ================================
          MAIN CONTENT
      ================================= */}

      <div className="ad-container">


        {/* ================================
            LEFT IMAGE
        ================================= */}

        <div className="ad-image-section">

          <div className="ad-image-wrapper">

            <img
              src={artwork.image}
              alt={artwork.title}
            />

            <button
              className="ad-favorite"
              onClick={() => toggleFavorite(artwork)}
              aria-label="Add to favorites"
            >
              <Heart
                size={20}
                fill={
                  isFavorite(artwork.id)
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

          </div>

        </div>


        {/* ================================
            RIGHT DETAILS
        ================================= */}

        <div className="ad-info">


          <span className="ad-category">
            {artwork.category}
          </span>


          <h1>
            {artwork.title}
          </h1>


          <p className="ad-artist">
            By {artwork.artist}
          </p>


          <div className="ad-price">
            ₹{artwork.price.toLocaleString("en-IN")}
          </div>


          <p className="ad-description">
            {artwork.description}
          </p>


          {/* DETAILS */}

          <div className="ad-meta">

            <div>
              <span>
                Type
              </span>

              <strong>
                {artwork.type}
              </strong>
            </div>


            <div>
              <span>
                Size
              </span>

              <strong>
                {artwork.size}
              </strong>
            </div>


            <div>
              <span>
                Year
              </span>

              <strong>
                {artwork.year}
              </strong>
            </div>

          </div>


          {/* BUTTON */}

          <button
            className="ad-add-to-cart"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={18} />

            Add to Cart
          </button>


          <button
            className="ad-buy-now"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>


          <p className="ad-note">
            Original artwork · Carefully
            packed and delivered
          </p>

        </div>

      </div>

    </main>
  );
}

export default ArtworkDetails;
