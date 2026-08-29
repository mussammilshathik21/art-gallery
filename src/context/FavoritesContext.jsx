import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext = createContext(null);

const FAVORITES_KEY = "ak-arts-favorites";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) =>
    favorites.some((item) => item.id === id);

  const toggleFavorite = (artwork) => {
    setFavorites((previous) => {
      if (previous.some((item) => item.id === artwork.id)) {
        return previous.filter(
          (item) => item.id !== artwork.id
        );
      }

      return [
        ...previous,
        {
          id: artwork.id,
          title: artwork.title,
          artist: artwork.artist,
          category: artwork.category,
          price: artwork.price,
          image: artwork.image,
        },
      ];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
