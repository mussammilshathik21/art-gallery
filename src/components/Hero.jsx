import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loadSiteContent } from "../data/siteContent";

import "../css/Hero.css";

function Hero() {
  const navigate = useNavigate();

  const [content, setContent] = useState(() => loadSiteContent().hero);

  useEffect(() => {
    setContent(loadSiteContent().hero);
  }, []);

  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-label">
          {content.label}
        </span>

        <h1>
          {content.title
            .split("\n")
            .map((line, index, lines) => (
              <span key={index}>
                {line}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
        </h1>

        <p>
          {content.description}
        </p>

        <div className="hero-buttons">

          {/* Explore Gallery */}

          <button
            className="hero-gallery-btn"
            onClick={() => navigate("/gallery")}
          >
            Explore Gallery
          </button>


          {/* Create Your Art */}

          <button
            className="hero-custom-btn"
            onClick={() => navigate("/create-art")}
          >
            Create Your Art
          </button>

        </div>

      </div>


      {/* Hero Image */}

      <div className="hero-image-wrapper">

        <img
          src={content.image}
          alt="Arts Gallery artwork"
          className="hero-image"
        />

      </div>

    </section>
  );
}

export default Hero;
