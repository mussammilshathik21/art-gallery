import {
  Mail,
  ArrowUpRight,
} from "lucide-react";

import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* =====================================
          MAIN FOOTER
      ====================================== */}

      <div className="footer-container">

        {/* =================================
            BRAND
        ================================= */}

        <div className="footer-brand">

          <a href="/" className="footer-logo">
            ARTS GALLERY
          </a>

          <p>
            Original art for meaningful spaces.
            Discover paintings and artworks created
            by talented artists.
          </p>

          <a
            href="mailto:hello@artsgallery.com"
            className="footer-email"
          >
            <Mail size={15} />
            hello@artsgallery.com
          </a>

        </div>


        {/* =================================
            EXPLORE
        ================================= */}

        <div className="footer-column">

          <h4>Explore</h4>

          <a href="/gallery">
            Gallery
          </a>

          <a href="/artists">
            Artists
          </a>

          <a href="/about">
            About Us
          </a>

          <a href="/contact">
            Contact
          </a>

        </div>


        {/* =================================
            COLLECTIONS
        ================================= */}

        <div className="footer-column">

          <h4>Collections</h4>

          <a href="/shop/oil-paint">
            Oil Paint
          </a>

          <a href="/shop/watercolor">
            Watercolor
          </a>

          <a href="/shop/acrylic">
            Acrylic
          </a>

          <a href="/shop/sketch">
            Sketch
          </a>

        </div>


        {/* =================================
            SOCIAL
        ================================= */}

        <div className="footer-column footer-social">

          <h4>Follow</h4>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
            <ArrowUpRight size={14} />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
            <ArrowUpRight size={14} />
          </a>

          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noreferrer"
          >
            Pinterest
            <ArrowUpRight size={14} />
          </a>

        </div>

      </div>


      {/* =====================================
          FOOTER BOTTOM
      ====================================== */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Arts Gallery.
          All rights reserved.
        </p>

        <div className="footer-legal">

          <a href="/privacy">
            Privacy Policy
          </a>

          <a href="/terms">
            Terms & Conditions
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;