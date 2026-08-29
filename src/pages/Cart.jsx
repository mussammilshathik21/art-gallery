import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import "../css/Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    items: cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
  } = useCart();


  return (
    <main className="cart-page">

      <div className="cart-container">


        {/* =====================================
            HEADER
        ====================================== */}

        <div className="cart-header">

          <span className="cart-label">
            YOUR SELECTION
          </span>

          <h1>
            Shopping Cart
          </h1>

          <p>
            {cartItems.length}{" "}
            {cartItems.length === 1
              ? "artwork"
              : "artworks"}{" "}
            in your cart
          </p>

        </div>


        {/* =====================================
            EMPTY CART
        ====================================== */}

        {cartItems.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              <ShoppingBag size={30} />
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Discover something beautiful
              for your space.
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
             CART CONTENT
          ====================================== */

          <div className="cart-layout">


            {/* =================================
                ITEMS
            ================================== */}

            <section className="cart-items">


              {cartItems.map((item) => (

                <article
                  className="cart-item"
                  key={item.id}
                >


                  {/* IMAGE */}

                  <div className="cart-item-image">

                    <img
                      src={item.image}
                      alt={item.title}
                    />

                  </div>


                  {/* INFO */}

                  <div className="cart-item-info">

                    <span>
                      ORIGINAL ARTWORK
                    </span>

                    <h2>
                      {item.title}
                    </h2>

                    <p>
                      By {item.artist}
                    </p>

                    <strong>
                      ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>


                  {/* CONTROLS */}

                  <div className="cart-item-controls">


                    <div className="quantity-control">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                      >
                        <Minus size={13} />
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                      >
                        <Plus size={13} />
                      </button>

                    </div>


                    <button
                      className="remove-item"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      title="Remove artwork"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>


                  {/* ITEM TOTAL */}

                  <div className="cart-item-total">

                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </div>

                </article>

              ))}

            </section>


            {/* =================================
                SUMMARY
            ================================== */}

            <aside className="cart-summary">

              <h2>
                Order Summary
              </h2>


              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {subtotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Shipping
                </span>

                <strong>

                  {shipping === 0
                    ? "Free"
                    : `₹${shipping}`}

                </strong>

              </div>


              <div className="summary-divider" />


              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>


              <button
                className="checkout-button"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Proceed to Checkout

                <ArrowRight size={16} />
              </button>


              <button
                className="continue-shopping"
                onClick={() =>
                  navigate("/gallery")
                }
              >
                Continue Shopping
              </button>


              <p className="shipping-note">
                Free shipping on orders
                above ₹5,000.
              </p>

            </aside>

          </div>

        )}

      </div>

    </main>
  );
}

export default Cart;
