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
    <section>
      <h2>Returns & Refunds</h2>

      <p>Enter your order number to check return and refund information.</p>

      <input
        type="text"
        placeholder="e.g. NS1001"
        value={orderNumber}
        onChange={(event) => setOrderNumber(event.target.value)}
      />

      <button onClick={handleSearch}>Check Order</button>
      <button onClick={goBack}>← Back to Support</button>
      {error && <p>{error}</p>}

{order && order.status === "Delivered" && (
  <div>
    <h3>Your order is eligible for return</h3>

    <p>Return window: 30 days</p>

    <p>
      You can return this order within 30 days of delivery.
    </p>
  </div>
)}

{order && order.status === "Cancelled" && (
  <div>
    <h3>Your order was cancelled</h3>

    <p>Your refund has been issued.</p>
  </div>
)}

{order &&
  order.status !== "Delivered" &&
  order.status !== "Cancelled" && (
    <div>
      <h3>Your order cannot be returned yet</h3>

      <p>
        Your order has not been delivered yet.
        You can start a return after delivery.
      </p>
    </div>
)}
    </section>
  );
}

export default ReturnsRefunds;
