import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { loadSiteContent } from "../data/siteContent";

import "../css/ArtistSection.css";

function ArtistSection() {
  const navigate = useNavigate();

  const [content, setContent] = useState(() => loadSiteContent().artist);

  useEffect(() => {
    setContent(loadSiteContent().artist);
  }, []);

  return (
    <section className="artist-section">
      <div className="artist-container">

        {/* Artist Image */}
        <div className="artist-image-wrapper">
          <img
            src={content.image}
            alt={content.name}
            className="artist-image"
          />
        </div>

        {/* Artist Content */}
        <div className="artist-content">

          <span className="artist-label">
            {content.label}
          </span>

          <h2>
            About the Artist
          </h2>

          <p>
            {content.bio}
          </p>

          <p className="artist-small-text">
            {content.bioSmall}
          </p>

          <button
            className="artist-link"
            onClick={() => navigate("/gallery")}
          >
            View Artist Portfolio
            <ArrowRight size={17} />
          </button>

        </div>

      </div>
    </section>
  );
}

export default ArtistSection;
