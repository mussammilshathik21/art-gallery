import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_KEY = "ak-arts-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);


  /* ================================
     ADD TO CART
  ================================= */

  const addToCart = (artwork, quantity = 1) => {
    setItems((previous) => {
      const existing = previous.find(
        (item) => item.id === artwork.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === artwork.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...previous,
        {
          id: artwork.id,
          title: artwork.title,
          artist: artwork.artist,
          price: artwork.price,
          image: artwork.image,
          quantity,
        },
      ];
    });
  };


  /* ================================
     QUANTITY / REMOVE
  ================================= */

  const increaseQuantity = (id) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setItems((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setItems((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setItems([]);
  };


  /* ================================
     TOTALS
  ================================= */

  const itemCount = items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping =
    items.length === 0 ? 0 : subtotal >= 5000 ? 0 : 150;

  const total = subtotal + shipping;


  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
