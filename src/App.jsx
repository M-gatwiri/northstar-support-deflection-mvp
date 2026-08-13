import React from 'react'
import SupportOption from './components/SupportOption';
function App() {
  return (
    <main>
      <h1>Northstar Support Center</h1>

      <p>How can we help you?</p>

      <SupportOption icon="📦"
      title="Order Status"
      description= "Check where your order is and when it will arrive"/>

      <SupportOption
      icon="🔃"
      title="Returns and Refunds"
      description="Get help with returning an order or checking your refund"/>
    </main>
  );
}

export default App;