import { Link } from "react-router-dom";

function Navbar({ cart, onToggleCart }) {
  // Calculate total number of albums in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        VinylVault
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        <button className="cart-button" onClick={onToggleCart}>
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
