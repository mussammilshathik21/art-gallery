import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { loadSiteContent, saveSiteContent } from "../../data/siteContent";

function AdminContent() {
  const [content, setContent] = useState(() => loadSiteContent());
  const [savedSection, setSavedSection] = useState(null);

  useEffect(() => {
    setContent(loadSiteContent());
  }, []);

  const updateHero = (field, value) => {
    setContent((previous) => ({
      ...previous,
      hero: { ...previous.hero, [field]: value },
    }));
  };

  const updateArtist = (field, value) => {
    setContent((previous) => ({
      ...previous,
      artist: { ...previous.artist, [field]: value },
    }));
  };

  const saveSection = (section) => {
    saveSiteContent(content);

    setSavedSection(section);
    setTimeout(() => setSavedSection(null), 2000);
  };

  return (
    <div className="admin-page">

      <div className="admin-page-header">
        <div>
          <h1>Site Content</h1>
          <p>
            Edit the images and copy shown on the Home
            page's Hero and Artist sections.
          </p>
        </div>
      </div>


      {/* =================================
          HERO SECTION
      ================================== */}

      <div className="admin-panel">

        <div className="admin-panel-header">
          <h2>Hero Section</h2>
        </div>

        <div className="admin-content-card">

          <div className="admin-content-preview">
            <img
              src={content.hero.image}
              alt="Hero preview"
            />
          </div>

          <div className="admin-content-fields">

            <label>
              Image URL
              <input
                value={content.hero.image}
                onChange={(event) =>
                  updateHero("image", event.target.value)
                }
                placeholder="https://..."
              />
            </label>

            <label>
              Eyebrow Label
              <input
                value={content.hero.label}
                onChange={(event) =>
                  updateHero("label", event.target.value)
                }
              />
            </label>

            <label>
              Title
              <textarea
                rows="2"
                value={content.hero.title}
                onChange={(event) =>
                  updateHero("title", event.target.value)
                }
              />
            </label>

            <label>
              Description
              <textarea
                rows="2"
                value={content.hero.description}
                onChange={(event) =>
                  updateHero("description", event.target.value)
                }
              />
            </label>

            <div>
              <button
                className="admin-primary-button admin-content-save"
                onClick={() => saveSection("hero")}
              >
                Save Hero Section
              </button>

              {savedSection === "hero" && (
                <span className="admin-content-saved">
                  <Check size={13} style={{ verticalAlign: "-2px" }} />
                  {" "}Saved
                </span>
              )}
            </div>

          </div>

        </div>

      </div>


      {/* =================================
          ARTIST SECTION
      ================================== */}

      <div className="admin-panel">

        <div className="admin-panel-header">
          <h2>Artist Section</h2>
        </div>

        <div className="admin-content-card">

          <div className="admin-content-preview">
            <img
              src={content.artist.image}
              alt="Artist preview"
            />
          </div>

          <div className="admin-content-fields">

            <label>
              Image URL
              <input
                value={content.artist.image}
                onChange={(event) =>
                  updateArtist("image", event.target.value)
                }
                placeholder="https://..."
              />
            </label>

            <label>
              Eyebrow Label
              <input
                value={content.artist.label}
                onChange={(event) =>
                  updateArtist("label", event.target.value)
                }
              />
            </label>

            <label>
              Artist Name
              <input
                value={content.artist.name}
                onChange={(event) =>
                  updateArtist("name", event.target.value)
                }
              />
            </label>

            <label>
              Bio
              <textarea
                rows="3"
                value={content.artist.bio}
                onChange={(event) =>
                  updateArtist("bio", event.target.value)
                }
              />
            </label>

            <label>
              Bio (secondary line)
              <textarea
                rows="2"
                value={content.artist.bioSmall}
                onChange={(event) =>
                  updateArtist("bioSmall", event.target.value)
                }
              />
            </label>

            <div>
              <button
                className="admin-primary-button admin-content-save"
                onClick={() => saveSection("artist")}
              >
                Save Artist Section
              </button>

              {savedSection === "artist" && (
                <span className="admin-content-saved">
                  <Check size={13} style={{ verticalAlign: "-2px" }} />
                  {" "}Saved
                </span>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminContent;
