import React, { useState } from "react";
import orders from "../data/orders";

function ReturnsRefunds({ goBack }) {
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
      <span className="section-icon">🔃</span>

      <h2>Returns & Refunds</h2>

      <p>
        Enter your order number to check return and refund information.
      </p>
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

    {error && <p className="error-message">{error}</p>}

    {order && order.status === "Delivered" && (
  <div className="result-card success-card">
    <div className="result-header">
      <div>
        <span className="result-label">Return status</span>
        <h3>Eligible for return</h3>
      </div>

      <span className="status-badge success-badge">
        Eligible
      </span>
    </div>

    <p>
      Your order was delivered and is eligible for return.
      You can return this order within 30 days of delivery.
    </p>

    <div className="order-detail">
      <span>Return window</span>
      <strong>30 days</strong>
    </div>
  </div>
)}

{order && order.status === "Cancelled" && (
  <div className="result-card refund-card">
    <div className="result-header">
      <div>
        <span className="result-label">Refund status</span>
        <h3>Refund issued</h3>
      </div>

      <span className="status-badge refund-badge">
        Refunded
      </span>
    </div>

    <p>
      Your order was cancelled and your refund has been issued.
    </p>
  </div>
)}

{order &&
  order.status !== "Delivered" &&
  order.status !== "Cancelled" && (
    <div className="result-card pending-card">
      <div className="result-header">
        <div>
          <span className="result-label">Return status</span>
          <h3>Not available yet</h3>
        </div>

        <span className="status-badge pending-badge">
          Pending
        </span>
      </div>

      <p>
        Your order has not been delivered yet. You can start a
        return after delivery.
      </p>
    </div>
  )}
  </section>
);
}

export default ReturnsRefunds;
