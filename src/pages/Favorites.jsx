import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";

import "../css/Favorites.css";

function Favorites() {
  const navigate = useNavigate();

  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart();


  /* =========================================
     ADD TO CART
  ========================================= */

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate("/cart");
  };


  /* =========================================
     VIEW ARTWORK
  ========================================= */

  const viewArtwork = (id) => {
    navigate(`/artwork/${id}`);
  };


  return (
    <main className="favorites-page">

      <div className="favorites-container">


        {/* =====================================
            HEADER
        ====================================== */}

        <div className="favorites-header">

          <span className="favorites-label">
            YOUR COLLECTION
          </span>

          <h1>
            Favorites
          </h1>

          <p>
            {favorites.length}{" "}
            {favorites.length === 1
              ? "artwork"
              : "artworks"}{" "}
            saved for later.
          </p>

        </div>


        {/* =====================================
            EMPTY STATE
        ====================================== */}

        {favorites.length === 0 ? (

          <div className="empty-favorites">

            <div className="empty-favorites-icon">
              <Heart size={30} />
            </div>

            <h2>
              No favorites yet
            </h2>

            <p>
              Save artworks you love and
              find them here later.
            </p>

            <button
              onClick={() =>
                navigate("/gallery")
              }
            >
              Explore Gallery

              <ArrowRight size={15} />
            </button>

          </div>

        ) : (

          /* =====================================
             FAVORITES GRID
          ====================================== */

          <div className="favorites-grid">

            {favorites.map((item) => (

              <article
                className="favorite-card"
                key={item.id}
              >


                {/* IMAGE */}

                <div
                  className="favorite-image"
                  onClick={() =>
                    viewArtwork(item.id)
                  }
                >

                  <img
                    src={item.image}
                    alt={item.title}
                  />


                  {/* REMOVE */}

                  <button
                    className="remove-favorite"
                    onClick={(event) => {
                      event.stopPropagation();

                      removeFavorite(
                        item.id
                      );
                    }}
                    title="Remove favorite"
                  >
                    <Trash2 size={15} />
                  </button>


                  {/* FAVORITE ICON */}

                  <div className="favorite-heart">

                    <Heart
                      size={17}
                      fill="currentColor"
                    />

                  </div>

                </div>


                {/* INFO */}

                <div className="favorite-info">

                  <span>
                    {item.category}
                  </span>

                  <h2
                    onClick={() =>
                      viewArtwork(item.id)
                    }
                  >
                    {item.title}
                  </h2>

                  <p>
                    By {item.artist}
                  </p>


                  <div className="favorite-bottom">

                    <strong>
                      ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                    </strong>


                    <button
                      className="favorite-cart-button"
                      onClick={() =>
                        handleAddToCart(item)
                      }
                    >
                      <ShoppingBag size={15} />

                      Add to Cart
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}

export default Favorites;
