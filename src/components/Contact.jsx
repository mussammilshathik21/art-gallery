import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

import "../css/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form:", formData);

    alert("Thank you! Your message has been sent.");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="contact-section">

      <div className="contact-container">

        {/* =================================
            LEFT SIDE - FORM
        ================================= */}

        <div className="contact-form-area">

          <span className="contact-label">
            GET IN TOUCH
          </span>

          <h2>
            We'd love to hear from you.
          </h2>

          <p className="contact-intro">
            Have a question about an artwork, an artist,
            or your order? Send us a message and we'll
            get back to you.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Name */}

            <div className="form-group">
              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>


            {/* Email */}

            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>


            {/* Message */}

            <div className="form-group">
              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Tell us how we can help..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>


            {/* Submit */}

            <button
              type="submit"
              className="contact-submit"
            >
              Send Message
              <ArrowRight size={17} />
            </button>

          </form>

        </div>


        {/* =================================
            RIGHT SIDE - CONTACT INFO
        ================================= */}

        <div className="contact-info">

          <div className="contact-info-header">

            <span className="contact-label">
              CONTACT
            </span>

            <h3>
              Visit the Gallery
            </h3>

            <p>
              Whether you're looking for a particular
              artwork or simply want to know more about
              our collection, we're here to help.
            </p>

          </div>


          {/* Email */}

          <div className="contact-detail">

            <div className="contact-icon">
              <Mail size={18} />
            </div>

            <div>
              <span>Email</span>

              <a href="mailto:hello@artsgallery.com">
                hello@artsgallery.com
              </a>
            </div>

          </div>


          {/* Phone */}

          <div className="contact-detail">

            <div className="contact-icon">
              <Phone size={18} />
            </div>

            <div>
              <span>Phone</span>

              <a href="tel:+910000000000">
                +91 XXXXX XXXXX
              </a>
            </div>

          </div>


          {/* Location */}

          <div className="contact-detail">

            <div className="contact-icon">
              <MapPin size={18} />
            </div>

            <div>
              <span>Location</span>

              <p>
                Tamil Nadu, India
              </p>
            </div>

          </div>


          {/* Opening hours */}

          <div className="contact-hours">

            <span>Gallery Hours</span>

            <p>
              Monday – Saturday
              <br />
              10:00 AM – 6:00 PM
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;