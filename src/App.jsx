import { useState } from "react";
import SupportOption from "./components/SupportOption";
import OrderStatus from "./components/OrderStatus";
import ReturnsRefunds from "./components/ReturnsRefunds";
import CheckIn from "./components/CheckIn";
import "./App.css";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <main className="app">
      <div className="support-container">

        <header className="support-header">
          <span className="brand">NORTHSTAR</span>

          <h1>How can we help you?</h1>

          <p>
            Get quick answers to common questions about your orders.
          </p>

          <button onClick={() => setSelectedOption("checkin")}>
            Event Check-In
          </button>
        </header>

        {!selectedOption && (
          <div className="support-options">
            <SupportOption
              icon="📦"
              title="Order Status"
              description="Check where your order is and when it will arrive"
              onClick={() => setSelectedOption("order")}
            />

            <SupportOption
              icon="🔃"
              title="Returns & Refunds"
              description="Get help with returning an order or checking your refund"
              onClick={() => setSelectedOption("returns")}
            />
          </div>
        )}

        {selectedOption === "order" && (
          <OrderStatus goBack={() => setSelectedOption(null)} />
        )}

        {selectedOption === "returns" && (
          <ReturnsRefunds goBack={() => setSelectedOption(null)} />
        )}

        {selectedOption === "checkin" && (
          <CheckIn />
        )}

      </div>
    </main>
  );
}

export default App;