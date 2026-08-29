import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

import {
  loadArtworks,
  addArtwork,
  updateArtwork,
  deleteArtwork,
  CATEGORIES,
} from "../../data/artworks";

const emptyForm = {
  title: "",
  artist: "",
  category: CATEGORIES[0],
  price: "",
  image: "",
  description: "",
  size: "",
  year: "2026",
  type: "Original Artwork",
  featured: false,
};

function AdminProducts() {
  const [artworks, setArtworks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setArtworks(loadArtworks());
  }, []);


  /* ================================
     OPEN FORM
  ================================= */

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (artwork) => {
    setForm({ ...artwork, price: String(artwork.price) });
    setEditingId(artwork.id);
    setShowForm(true);
  };


  /* ================================
     FORM CHANGE
  ================================= */

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  /* ================================
     SUBMIT
  ================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price) || 0,
      image:
        form.image.trim() ||
        `https://picsum.photos/seed/ak-art-${Date.now()}/700/850`,
    };

    if (editingId) {
      setArtworks(updateArtwork(editingId, payload));
    } else {
      setArtworks(addArtwork(payload));
    }

    setShowForm(false);
  };


  /* ================================
     DELETE
  ================================= */

  const handleDelete = (id) => {
    if (!window.confirm("Delete this artwork? This cannot be undone.")) {
      return;
    }

    setArtworks(deleteArtwork(id));
  };


  return (
    <div className="admin-page">

      <div className="admin-page-header">

        <div>
          <h1>Products</h1>
          <p>Manage the artworks shown across the store.</p>
        </div>

        <button className="admin-primary-button" onClick={openAdd}>
          <Plus size={16} />
          Add Artwork
        </button>

      </div>

      <div className="admin-panel">

        {artworks.length === 0 ? (

          <p className="admin-empty">
            No artworks yet. Add your first piece to
            get the gallery started.
          </p>

        ) : (

          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Artist</th>
                <th>Category</th>
                <th>Price</th>
                <th>Featured</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {artworks.map((artwork) => (
                <tr key={artwork.id}>
                  <td>
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="admin-thumb"
                    />
                  </td>
                  <td>{artwork.title}</td>
                  <td>{artwork.artist}</td>
                  <td>{artwork.category}</td>
                  <td>
                    ₹{Number(artwork.price).toLocaleString("en-IN")}
                  </td>
                  <td>{artwork.featured ? "Yes" : "—"}</td>
                  <td className="admin-row-actions">
                    <button
                      onClick={() => openEdit(artwork)}
                      aria-label="Edit artwork"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(artwork.id)}
                      aria-label="Delete artwork"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}

      </div>


      {/* =================================
          ADD / EDIT MODAL
      ================================== */}

      {showForm && (

        <div
          className="admin-modal-overlay"
          onClick={() => setShowForm(false)}
        >

          <div
            className="admin-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="admin-modal-header">
              <h2>{editingId ? "Edit Artwork" : "Add Artwork"}</h2>
              <button onClick={() => setShowForm(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">

              <div className="admin-form-row">

                <label>
                  Title
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Artist
                  <input
                    name="artist"
                    value={form.artist}
                    onChange={handleChange}
                    required
                  />
                </label>

              </div>

              <div className="admin-form-row">

                <label>
                  Category
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Price (₹)
                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </label>

              </div>

              <label>
                Image URL
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://... (leave blank for a placeholder)"
                />
              </label>

              <div className="admin-form-row">

                <label>
                  Size
                  <input
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    placeholder="24 × 30 inches"
                  />
                </label>

                <label>
                  Year
                  <input
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                  />
                </label>

              </div>

              <label>
                Description
                <textarea
                  name="description"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                />
              </label>

              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />
                Featured artwork
              </label>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="admin-secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-primary-button"
                >
                  {editingId ? "Save Changes" : "Add Artwork"}
                </button>
              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminProducts;
