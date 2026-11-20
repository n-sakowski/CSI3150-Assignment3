import { useState } from "react";
import { Link } from "react-router-dom";

function CheckoutPage({ cart, cartSubtotal, onCheckoutComplete }) {
  // Controlled form state
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    cardDetails: "",
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== "",
    );

    if (!allFieldsFilled) {
      alert("Please complete all checkout fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Basic demonstration validation
    const cardNumber = formData.cardDetails.replace(/\s/g, "");

    if (!/^\d{13,19}$/.test(cardNumber)) {
      alert("Please enter a valid card number.");
      return;
    }

    // Complete checkout
    onCheckoutComplete();
    setOrderConfirmed(true);
  };

  // Successful order confirmation
  if (orderConfirmed) {
    return (
      <main className="main-content">
        <div className="order-summary-card">
          <h1>Order Confirmed!</h1>

          <p>
            Thank you for shopping at VinylVault. Your order has been
            successfully placed.
          </p>

          <Link to="/" className="btn btn-primary">
            Return to Collection
          </Link>
        </div>
      </main>
    );
  }

  // Empty cart handling
  if (cart.length === 0) {
    return (
      <main className="main-content">
        <h1>Your Cart Is Empty</h1>

        <p>Add some albums before proceeding to checkout.</p>

        <Link to="/" className="btn btn-primary">
          Browse Albums
        </Link>
      </main>
    );
  }

  return (
    <main className="main-content">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        {/* Order Summary */}
        <section className="order-summary-card">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-img"
              />

              <div className="cart-item-info">
                <h3>{item.title}</h3>

                <p>{item.artist}</p>

                <p>Quantity: {item.quantity}</p>

                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div className="summary-row total-row">
            <span>Subtotal</span>

            <span>${cartSubtotal.toFixed(2)}</span>
          </div>
        </section>

        {/* Checkout Form */}
        <section>
          <h2>Shipping & Payment Information</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Amartya Sen"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>

              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. 502 Meadow Brook Rd"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>

              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Rochester"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>

              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="e.g. 49216"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardDetails">Card Details</label>

              <input
                type="text"
                id="cardDetails"
                name="cardDetails"
                value={formData.cardDetails}
                onChange={handleChange}
                placeholder="e.g. 1029384756473829"
                autoComplete="off"
                inputMode="numeric"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Place Order
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default CheckoutPage;
