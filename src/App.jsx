import { useState } from "react";
import SupportOption from "./components/SupportOption";
import OrderStatus from "./components/OrderStatus";
import ReturnsRefunds from "./components/ReturnsRefunds";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <main>
      <h1>Northstar Support Center</h1>

      <p>How can we help you?</p>

      <SupportOption
        icon="📦"
        title="Order Status"
        description="Check where your order is and when it will arrive"
        onClick={() => setSelectedOption("order")}
      />

      <SupportOption
        icon="🔃"
        title="Returns and Refunds"
        description="Get help with returning an order or checking your refund"
        onClick={() => setSelectedOption("returns")}
      />

      {selectedOption === "order" && (
        <OrderStatus goBack={() => setSelectedOption(null)} />
      )}
      {selectedOption === "returns" && (
        <ReturnsRefunds goBack={() => setSelectedOption(null)} />
      )}
    </main>
  );
}

export default App;
