import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";

import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

import { ALBUMS } from "./data/albums";

function App() {
  // Shared cart state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("vinylVaultCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("vinylVaultCart", JSON.stringify(cart));
  }, [cart]);

  // Shared cart drawer visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add an album to the cart
  const onAddToCart = (album) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === album.id);

      if (existingItem) {
        if (existingItem.quantity >= album.stock) {
          return prevCart;
        }

        return prevCart.map((item) =>
          item.id === album.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      if (album.stock <= 0) {
        return prevCart;
      }

      return [...prevCart, { ...album, quantity: 1 }];
    });
  };

  // Remove an album from the cart
  const onRemoveFromCart = (albumId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== albumId));
  };

  // Increase quantity
  const onIncrease = (albumId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== albumId) return item;

        return {
          ...item,
          quantity: Math.min(item.stock, item.quantity + 1),
        };
      }),
    );
  };

  // Decrease quantity
  const onDecrease = (albumId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== albumId) return item;

        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      }),
    );
  };

  // Calculate cart subtotal
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Complete checkout
  const onCheckoutComplete = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <>
      <Navbar cart={cart} onCartClick={() => setIsCartOpen(true)} />

      <Routes>
        <Route
          path="/"
          element={<CatalogPage albums={ALBUMS} onAddToCart={onAddToCart} />}
        />

        <Route
          path="/album/:albumId"
          element={
            <AlbumDetailPage albums={ALBUMS} onAddToCart={onAddToCart} />
          }
        />

        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              cartSubtotal={cartSubtotal}
              onCheckoutComplete={onCheckoutComplete}
            />
          }
        />
      </Routes>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemoveFromCart}
        cartSubtotal={cartSubtotal}
      />
    </>
  );
}

export default App;
