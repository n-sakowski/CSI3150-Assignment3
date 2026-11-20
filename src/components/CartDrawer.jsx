import { useNavigate } from "react-router-dom";

function CartDrawer({
  isOpen,
  cart,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  cartSubtotal,
}) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {isOpen && (
        <div className="drawer-overlay" onClick={onClose}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>Your Cart</h2>

              <button
                className="btn-close"
                onClick={onClose}
                aria-label="Close cart"
              >
                &times;
              </button>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <p>Your cart is currently empty.</p>
              ) : (
                <ul className="cart-list">
                  {cart.map((item) => (
                    <li className="cart-item" key={item.id}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-item-img"
                      />

                      <div className="cart-item-info">
                        <h4>{item.title}</h4>

                        <p>{item.artist}</p>

                        <p>${(item.price * item.quantity).toFixed(2)}</p>

                        <div className="qty-controls">
                          <button
                            className="btn-secondary"
                            onClick={() => onDecrease(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            className="btn-secondary"
                            onClick={() => onIncrease(item.id)}
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </button>

                          <button
                            className="btn-remove"
                            onClick={() => onRemove(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="drawer-footer">
              <div className="subtotal-row">
                <strong>Subtotal:</strong>

                <strong>${cartSubtotal.toFixed(2)}</strong>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartDrawer;
