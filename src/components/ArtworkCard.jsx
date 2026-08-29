import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

import { useFavorites } from "../context/FavoritesContext";

import "../css/ArtworkCard.css";

function ArtworkCard({ artwork }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <article
      className="artwork-card"
      onClick={() =>
        navigate(`/artwork/${artwork.id}`)
      }
    >

      <div className="artwork-card-image">

        <img
          src={artwork.image}
          alt={artwork.title}
        />

        <button
          className="artwork-card-favorite"
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


      <div className="artwork-card-info">

        <h3>
          {artwork.title}
        </h3>

        <span>
          {artwork.artist}
        </span>

        <strong>
          ₹{artwork.price.toLocaleString("en-IN")}
        </strong>

      </div>

    </article>
  );
}

export default ArtworkCard;
