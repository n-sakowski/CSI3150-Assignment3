import { useNavigate } from "react-router-dom";

function CartDrawer({
  cart,
  isCartOpen,
  onToggleCart,
  onRemoveFromCart,
  onUpdateQuantity,
  cartSubtotal,
}) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    onToggleCart();
    navigate("/checkout");
  };

  return (
    <>
      {isCartOpen && <div className="cart-overlay" onClick={onToggleCart} />}

      <aside className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Shopping Cart</h2>

          <button
            className="close-cart"
            onClick={onToggleCart}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is currently empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>{item.artist}</p>

                  <p className="cart-item-price">${item.price.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      disabled={item.quantity >= item.stock}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-subtotal">
            <span>Subtotal:</span>
            <strong>${cartSubtotal.toFixed(2)}</strong>
          </div>

          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </>
  );
}

export default CartDrawer;
