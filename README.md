# Northstar Support Deflection MVP

A self-service customer support MVP built for **Northstar Retail Co.** as part of the **Northstar Sprint**.

The goal is to reduce repetitive support tickets by allowing customers to resolve common questions without contacting a support agent.

## 🎯 MVP Scope

The MVP supports two ticket categories:

1. 📦 Order Status
2. 🔄 Returns & Refunds

Stock availability is outside the current MVP scope.

## 🚀 Features

### 📦 Order Status

Customers can:

- Enter an order number.
- View order status.
- View expected delivery date.
- View carrier information.
- Receive an error for invalid orders.
- Search using uppercase or lowercase order numbers.
- Return to the Support Center.

### 🔄 Returns & Refunds

Customers can:

- Enter an order number.
- Check return eligibility.
- View the 30-day return window for delivered orders.
- Receive refund information for cancelled orders.
- Receive guidance for undelivered orders.
- Receive an error for invalid orders.
- Return to the Support Center.

## 📊 Support Deflection

### Before

```text
Customer question
       ↓
Contact support
       ↓
Support ticket
       ↓
Agent responds

Customer question
       ↓
Open Support Center
       ↓
Select category
       ↓
Enter order number
       ↓
Receive answer

Testing

The MVP has been tested for:

Valid orders
Invalid orders
Empty order numbers
Lowercase order numbers
Delivered orders
Cancelled orders
Processing orders
Out-for-delivery orders
Back navigation
🛠️ Technology
React
JavaScript
Vite
CSS
Git
GitHub

###Project Structure
northstar-mvp/
├── src/
│   ├── components/
│   │   ├── OrderStatus.jsx
│   │   ├── ReturnsRefunds.jsx
│   │   └── SupportOption.jsx
│   ├── data/
│   │   └── orders.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── package.json
└── README.md