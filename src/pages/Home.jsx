import Hero from "../components/Hero";
import Category from "../components/CategoryShowcase";
import Artist from "../components/ArtistSection";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import "../css/Home.css";

function Home() {
  return (
    <main className="home-page">

      {/* ================================
          HERO
      ================================= */}

      <section
        id="hero"
        className="home-section hero-section"
      >
        <Hero />
      </section>


      {/* ================================
          CATEGORIES
      ================================= */}

      <section
        id="categories"
        className="home-section categories-section"
      >
        <Category />
      </section>


      {/* ================================
          ARTIST
      ================================= */}

      <section
        id="artist"
        className="home-section artist-section"
      >
        <Artist />
      </section>


      {/* ================================
          ABOUT
      ================================= */}

      <section
        id="about"
        className="home-section about-section-wrapper"
      >
        <div className="about-section">

          <span className="about-label">
            ABOUT ARTS GALLERY
          </span>

          <h2>
            Art that brings
            <br />
            emotion to your space.
          </h2>

          <p>
            Arts Gallery is a collection of original
            artworks created for people who
            appreciate creativity, expression,
            and timeless beauty.
          </p>

          <p>
            From expressive oil paintings to
            delicate watercolors, every artwork
            is carefully selected to bring
            character and emotion into your space.
          </p>

        </div>
      </section>


      {/* ================================
          CONTACT
      ================================= */}

      <section
        id="contact"
        className="home-section contact-section"
      >
        <Contact />
      </section>


      {/* ================================
          FOOTER
      ================================= */}

      <Footer />

    </main>
  );
}

export default Home;