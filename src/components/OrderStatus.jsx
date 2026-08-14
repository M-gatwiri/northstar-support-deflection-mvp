import { useState } from "react";
import orders from "../data/orders";

function OrderStatus({ goBack }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

 function handleSearch() {
  if (!orderNumber.trim()) {
    setOrder(null);
    setError("Please enter your order number.");
    return;
  }

  const foundOrder = orders.find(
    (order) => order.id === orderNumber.trim().toUpperCase()
  );

  if (foundOrder) {
    setOrder(foundOrder);
    setError("");
  } else {
    setOrder(null);
    setError("We couldn't find an order with that number.");
  }
}

  return (
  <section className="support-section">
    <button className="back-button" onClick={goBack}>
      ← Back to Support
    </button>

    <div className="section-header">
      <span className="section-icon">📦</span>

      <h2>Where is your order?</h2>

      <p>Enter your order number to check its status.</p>
    </div>

    <div className="search-box">
      <input
        type="text"
        placeholder="e.g. NS1001"
        value={orderNumber}
        onChange={(event) => setOrderNumber(event.target.value)}
      />

      <button
  className="primary-button"
  onClick={handleSearch}
  disabled={!orderNumber.trim()}
>
  Check Order
</button>
    </div>

    <p className="input-hint">
  Your order number can be found in your order confirmation email.
</p>

    {error && <p className="error-message">{error}</p>}

    {order && (
  <div className="result-card">
    <div className="result-header">
      <div>
        <span className="result-label">Order</span>
        <h3>#{order.id}</h3>
      </div>

      <span className="status-badge">
        {order.status}
      </span>
    </div>

    <div className="order-detail">
      <span>Expected delivery</span>
      <strong>{order.deliveryDate}</strong>
    </div>

    <div className="order-detail">
      <span>Carrier</span>
      <strong>{order.carrier}</strong>
    </div>

    <p className="result-message">
      Your order is currently {order.status.toLowerCase()}.
    </p>
  </div>
)}
  </section>
);
}

export default OrderStatus;
