import { Link } from "react-router-dom";

function Navbar({ cart, onCartClick }) {
  // Calculate the total number of items in the cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-logo">
          🎶VinylVault🎶
        </Link>

        <nav className="nav-actions">
          {/* <Link to="/" className="nav-link">
            Collection
          </Link> */}

          <button className="btn-cart-badge" onClick={onCartClick}>
            Cart
            <span className="badge-pill">{cartCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
