# Northstar Support Deflection MVP

A self-service customer support MVP built for **Northstar Retail Co.** as part of the Northstar Sprint industry working simulation.

The goal of this project is to reduce repetitive customer-support tickets by allowing customers to independently resolve common questions about their orders, returns, and refunds.

---

## 🎯 Project Objective

Northstar Retail Co. is experiencing a high volume of repetitive support tickets, particularly around:

- Order status
- Returns and refunds
- Stock availability

For this MVP, we are focusing on **two ticket categories**:

1. 📦 Order Status
2. 🔄 Returns & Refunds

The MVP demonstrates how customers can get answers to these questions without needing to contact a support agent.

---

## 🚀 MVP Features

### 📦 Order Status

Customers can:

- Select the Order Status option
- Enter their order number
- Search for an order
- View the current order status
- View the expected delivery date
- View the shipping carrier
- Receive an error message when an order cannot be found
- Return to the main support menu

Example order numbers:

```text
NS1001
NS1002
NS1003 

# Returns & Refunds

## Overview

The Returns & Refunds feature allows Northstar customers to check whether their order is eligible for a return and receive basic refund information without contacting a support agent.

The goal is to reduce repetitive customer-support tickets related to returns and refunds.

---

## How It Works

The customer:

1. Selects **Returns & Refunds** from the Support Center.
2. Enters their order number.
3. Clicks **Check Order**.
4. The system searches the available order data.
5. The system checks the order status.
6. The customer receives the appropriate return or refund information.

---

## Customer Scenarios

### Delivered Order

If the order has been delivered, the customer receives:

- Confirmation that the order is eligible for return.
- The return window.
- Basic instructions for returning the order.

Example:

> Your order is eligible for return.
>
> Return window: 30 days.
>
> You can return this order within 30 days of delivery.

---

### Cancelled Order

If the order has been cancelled, the customer receives refund information.

Example:

> Your order was cancelled.
>
> Your refund has been issued.

---

### Processing, Shipped, or Out for Delivery

If the order has not been delivered yet, the customer is informed that a return cannot be started yet.

Example:

> Your order cannot be returned yet.
>
> Your order has not been delivered yet. You can start a return after delivery.

---

### Invalid Order Number

If the customer enters an order number that does not exist, the system displays an error message.

Example:

> We couldn't find an order with that number.

---

### Empty Order Number

If the customer clicks **Check Order** without entering an order number, the system asks them to provide one.

Example:

> Please enter your order number.

---

## Example Order Numbers

The MVP currently uses mock order data.

Try:

```text
NS1002
NS1005
NS1003
NS9999

## 📊 Support Deflection Goal

The primary goal of the Northstar Support Deflection MVP is to reduce the number of repetitive support tickets that require manual handling by support agents.

The MVP achieves this by allowing customers to independently find answers to common questions about their orders, returns, and refunds.

### Current Support Process

```text
Customer has a question
        ↓
Customer contacts support
        ↓
Support ticket is created
        ↓
Support agent reviews the request
        ↓
Agent provides an answer 

## 👥 Team Collaboration

This project is being developed collaboratively by a five-person team as part of the Northstar Sprint industry working simulation.

The team combines technical and non-technical contributions to ensure that the MVP is not only functional but also properly planned, tested, documented, and ready for handover.

### Team Responsibilities

#### 💻 Development

Responsible for:

- Building the React application.
- Implementing application logic.
- Creating and integrating components.
- Fixing technical issues.
- Testing and improving functionality.

#### 📋 Product / Project Management

Responsible for:

- Defining the MVP scope.
- Creating user stories and acceptance criteria.
- Managing the project board.
- Assigning and tracking tasks.
- Monitoring progress and blockers.
- Preventing unnecessary scope expansion.

#### 🎨 UI/UX

Responsible for:

- Designing the user interface.
- Creating wireframes and user flows.
- Improving usability.
- Maintaining visual consistency.
- Providing design recommendations for the MVP.

#### 🧪 QA / Testing

Responsible for:

- Creating the test plan.
- Testing features against acceptance criteria.
- Identifying and documenting bugs.
- Performing regression testing.
- Verifying that the MVP works correctly before delivery.

#### 📝 Documentation / Presentation

Responsible for:

- Maintaining project documentation.
- Preparing the go-live readiness note.
- Documenting known limitations.
- Preparing the final product demonstration.
- Supporting the final delivery package.

---

### Collaboration Principles

All team members are expected to make visible and meaningful contributions throughout the sprint.

Contributions may include:

- Code
- Documentation
- Product requirements
- UI/UX designs
- Testing
- Bug reports
- Project planning
- Task management
- Reviews
- Presentation preparation

Collaboration is not limited to writing code. Every team member is responsible for contributing to the successful delivery of the MVP.

---

### Git Collaboration

The team maintains a shared GitHub repository for the project.

Team members should:

1. Communicate with the team before making significant changes.
2. Pull the latest version of the project before starting work.
3. Clearly communicate what they are working on.
4. Make meaningful commits that describe their contribution.
5. Keep project documentation and board statuses up to date.
6. Inform the team before pushing changes to the shared `main` branch.

### Commit Convention

Commit messages should follow this format:

```text
<type>: <what changed> - <why it matters>