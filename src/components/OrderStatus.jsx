import { useState } from "react";
import orders from "../data/orders";

function OrderStatus({ goBack }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  function handleSearch() {
    const foundOrder = orders.find((order) => order.id === orderNumber);

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
      <h2>Where is your order?</h2>

      <p>Enter your order number to check its status.</p>

      <input
        type="text"
        placeholder="e.g. NS1001"
        value={orderNumber}
        onChange={(event) => setOrderNumber(event.target.value)}
      />

      <button onClick={handleSearch}>Check Order</button>

      {error && <p>{error}</p>}

      {order && (
        <div>
          <h3>Order #{order.id}</h3>

          <p>Status: {order.status}</p>

          <p>Expected delivery: {order.deliveryDate}</p>

          <p>Carrier: {order.carrier}</p>
        </div>
      )}
      <button onClick={goBack}>← Back to Support</button>
    </section>
  );
}

export default OrderStatus;
