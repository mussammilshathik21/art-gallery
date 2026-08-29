import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Image as ImageIcon,
  X,
  ArrowLeft,
  Check,
} from "lucide-react";

import "../css/CreateYourArt.css";


// ==========================================
// PRICING
// ==========================================

const peopleOptions = [
  {
    id: "single",
    name: "Single Person",
    price: 1500,
  },
  {
    id: "couple",
    name: "Couple",
    price: 2200,
  },
  {
    id: "family",
    name: "Family",
    price: 3000,
  },
  {
    id: "group",
    name: "Group",
    price: 4000,
  },
];


const ratioOptions = [
  {
    id: "1:1",
    name: "Square",
    price: 0,
  },
  {
    id: "4:5",
    name: "Portrait",
    price: 200,
  },
  {
    id: "3:4",
    name: "Classic",
    price: 300,
  },
  {
    id: "16:9",
    name: "Landscape",
    price: 500,
  },
];


const styleOptions = [
  {
    id: "pencil",
    name: "Pencil Art",
    price: 0,
  },
  {
    id: "watercolor",
    name: "Watercolor",
    price: 500,
  },
  {
    id: "digital",
    name: "Digital Art",
    price: 600,
  },
  {
    id: "oil",
    name: "Oil Paint",
    price: 800,
  },
  {
    id: "acrylic",
    name: "Acrylic",
    price: 1000,
  },
];


function CreateYourArt() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [selectedPeople, setSelectedPeople] =
    useState("single");

  const [selectedRatio, setSelectedRatio] =
    useState("1:1");

  const [selectedStyle, setSelectedStyle] =
    useState("pencil");


  // ==========================================
  // IMAGE UPLOAD
  // ==========================================

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Maximum 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert("Please upload an image smaller than 10MB.");
      return;
    }

    // Only image files
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImage({
      file,
      url: imageUrl,
      name: file.name,
    });
  };


  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const removeImage = () => {
    if (image?.url) {
      URL.revokeObjectURL(image.url);
    }

    setImage(null);
  };


  // ==========================================
  // FIND SELECTED OPTIONS
  // ==========================================

  const selectedPeopleData =
    peopleOptions.find(
      (item) =>
        item.id === selectedPeople
    );

  const selectedRatioData =
    ratioOptions.find(
      (item) =>
        item.id === selectedRatio
    );

  const selectedStyleData =
    styleOptions.find(
      (item) =>
        item.id === selectedStyle
    );


  // ==========================================
  // PRICE
  // ==========================================

  const basePrice =
    selectedPeopleData?.price || 0;

  const ratioPrice =
    selectedRatioData?.price || 0;

  const stylePrice =
    selectedStyleData?.price || 0;

  const totalPrice =
    basePrice +
    ratioPrice +
    stylePrice;


  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handleContinue = () => {
    if (!image) {
      alert("Please upload your photo first.");
      return;
    }

    const customOrder = {
      image,
      people: selectedPeopleData,
      ratio: selectedRatioData,
      style: selectedStyleData,
      totalPrice,
    };

    console.log("Custom Artwork:", customOrder);

    /*
      Later we will send this information
      to Supabase.
    */

    navigate("/checkout", {
      state: {
        customOrder,
      },
    });
  };


  return (
    <main className="create-art-page">


      {/* ======================================
          HEADER
      ======================================= */}

      <section className="create-art-header">

        <button
          className="create-art-back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />

          Back
        </button>


        <span className="create-art-label">
          CUSTOM ARTWORK
        </span>


        <h1>
          Create Your Art
        </h1>


        <p>
          Turn your favorite memory into
          a beautiful piece of art.
        </p>

      </section>


      {/* ======================================
          MAIN CONTENT
      ======================================= */}

      <section className="create-art-container">


        {/* ====================================
            LEFT SIDE
        ===================================== */}

        <div className="create-art-form">


          {/* ==================================
              UPLOAD
          =================================== */}

          <div className="create-section">

            <div className="section-heading">

              <span>
                01
              </span>

              <div>
                <h2>
                  Upload your photo
                </h2>

                <p>
                  Choose a clear photo for
                  the best result.
                </p>
              </div>

            </div>


            {!image ? (

              <label
                className="upload-box"
              >

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                />


                <div className="upload-icon">
                  <Upload size={24} />
                </div>


                <h3>
                  Upload your photo
                </h3>


                <p>
                  JPG, PNG or WEBP
                </p>


                <span>
                  Maximum file size 10MB
                </span>

              </label>

            ) : (

              <div className="uploaded-image">

                <img
                  src={image.url}
                  alt="Uploaded artwork"
                />


                <button
                  className="remove-image"
                  onClick={removeImage}
                >
                  <X size={17} />
                </button>


                <div className="uploaded-image-info">

                  <ImageIcon size={15} />

                  <span>
                    {image.name}
                  </span>

                </div>

              </div>

            )}

          </div>


          {/* ==================================
              PEOPLE
          =================================== */}

          <div className="create-section">

            <div className="section-heading">

              <span>
                02
              </span>

              <div>
                <h2>
                  Who is in the photo?
                </h2>

                <p>
                  Select the number of people.
                </p>
              </div>

            </div>


            <div className="option-grid">

              {peopleOptions.map((item) => (

                <button
                  key={item.id}
                  className={`option-card ${
                    selectedPeople === item.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedPeople(
                      item.id
                    )
                  }
                >

                  <div className="option-top">

                    <span>
                      {item.name}
                    </span>

                    {selectedPeople ===
                      item.id && (
                      <Check size={16} />
                    )}

                  </div>


                  <strong>
                    ₹
                    {item.price.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </button>

              ))}

            </div>

          </div>


          {/* ==================================
              RATIO
          =================================== */}

          <div className="create-section">

            <div className="section-heading">

              <span>
                03
              </span>

              <div>
                <h2>
                  Choose your ratio
                </h2>

                <p>
                  Select the shape of your
                  final artwork.
                </p>
              </div>

            </div>


            <div className="ratio-grid">

              {ratioOptions.map((item) => (

                <button
                  key={item.id}
                  className={`ratio-card ${
                    selectedRatio === item.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedRatio(
                      item.id
                    )
                  }
                >

                  <div
                    className={`ratio-preview ratio-${item.id.replace(
                      ":",
                      "-"
                    )}`}
                  />

                  <div>

                    <strong>
                      {item.id}
                    </strong>

                    <span>
                      {item.price === 0
                        ? "Included"
                        : `+ ₹${item.price}`}
                    </span>

                  </div>

                </button>

              ))}

            </div>

          </div>


          {/* ==================================
              STYLE
          =================================== */}

          <div className="create-section">

            <div className="section-heading">

              <span>
                04
              </span>

              <div>
                <h2>
                  Choose your art style
                </h2>

                <p>
                  Select how your photo
                  should be transformed.
                </p>
              </div>

            </div>


            <div className="style-grid">

              {styleOptions.map((item) => (

                <button
                  key={item.id}
                  className={`style-card ${
                    selectedStyle === item.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedStyle(
                      item.id
                    )
                  }
                >

                  <span>
                    {item.name}
                  </span>


                  <strong>
                    {item.price === 0
                      ? "Included"
                      : `+ ₹${item.price}`}
                  </strong>


                  {selectedStyle ===
                    item.id && (
                    <Check
                      size={16}
                      className="style-check"
                    />
                  )}

                </button>

              ))}

            </div>

          </div>

        </div>


        {/* ====================================
            RIGHT SUMMARY
        ===================================== */}

        <aside className="create-art-summary">

          <div className="summary-inner">

            <span className="summary-label">
              YOUR ARTWORK
            </span>


            <h2>
              Order Summary
            </h2>


            {/* PREVIEW */}

            <div className="summary-preview">

              {image ? (

                <img
                  src={image.url}
                  alt="Preview"
                />

              ) : (

                <div className="empty-preview">

                  <ImageIcon size={25} />

                  <span>
                    Your photo preview
                  </span>

                </div>

              )}

            </div>


            {/* SUMMARY */}

            <div className="summary-details">


              <div className="summary-row">

                <span>
                  People
                </span>

                <strong>
                  {selectedPeopleData?.name}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Ratio
                </span>

                <strong>
                  {selectedRatio}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Art Style
                </span>

                <strong>
                  {selectedStyleData?.name}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Base Price
                </span>

                <strong>
                  ₹
                  {basePrice.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Ratio
                </span>

                <strong>
                  {ratioPrice === 0
                    ? "Included"
                    : `₹${ratioPrice.toLocaleString(
                        "en-IN"
                      )}`}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Style
                </span>

                <strong>
                  {stylePrice === 0
                    ? "Included"
                    : `₹${stylePrice.toLocaleString(
                        "en-IN"
                      )}`}
                </strong>

              </div>

            </div>


            {/* TOTAL */}

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            {/* BUTTON */}

            <button
              className="continue-button"
              onClick={handleContinue}
            >
              Continue to Order

              <ArrowLeft
                size={17}
                className="continue-arrow"
              />
            </button>


            <p className="summary-note">
              Final artwork will be created
              according to your selected
              style and specifications.
            </p>

          </div>

        </aside>

      </section>

    </main>
  );
}

export default CreateYourArt;