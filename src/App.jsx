import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";

import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

import { ALBUMS } from "./data/albums";

function App() {
  // Shared cart state
  const [cart, setCart] = useState([]);

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

  // Increase or decrease an album's quantity
  const onUpdateQuantity = (albumId, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id !== albumId) {
          return item;
        }

        const newQuantity = Math.max(
          1,
          Math.min(item.stock, item.quantity + amount),
        );

        return { ...item, quantity: newQuantity };
      }),
    );
  };

  // Toggle the cart drawer
  const onToggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  // Calculate the cart subtotal
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Clear the cart after a successful checkout
  const onCheckoutComplete = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <>
      <Navbar cart={cart} onToggleCart={onToggleCart} />

      <CartDrawer
        cart={cart}
        isCartOpen={isCartOpen}
        onToggleCart={onToggleCart}
        onRemoveFromCart={onRemoveFromCart}
        onUpdateQuantity={onUpdateQuantity}
        cartSubtotal={cartSubtotal}
      />

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
    </>
  );
}

export default App;
