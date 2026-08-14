# Northstar Support Deflection MVP — QA Test Cases

## Purpose

These test cases verify that the Northstar Support Deflection MVP correctly handles the supported customer support scenarios for Order Status and Returns & Refunds.

---

## Order Status

### Test 1 — Valid shipped order

**Input:** `NS1001`

**Expected result:**
- Order is found.
- Status displays as "Shipped".
- Expected delivery date is displayed.
- Carrier is displayed.

**Result:** PASS

---

### Test 2 — Valid delivered order

**Input:** `NS1002`

**Expected result:**
- Order is found.
- Status displays as "Delivered".
- Expected delivery date is displayed.
- Carrier is displayed.

**Result:** PASS

---

### Test 3 — Valid processing order

**Input:** `NS1003`

**Expected result:**
- Order is found.
- Status displays as "Processing".
- Expected delivery date is displayed.

**Result:** PASS

---

### Test 4 — Invalid order number

**Input:** `NS9999`

**Expected result:**
- No order result is displayed.
- A clear error message is displayed.

**Result:** PASS

---

### Test 5 — Empty order number

**Input:** Empty

**Expected result:**
- Search cannot be submitted.
- User is prompted to enter an order number.

**Result:** PASS

---

### Test 6 — Lowercase order number

**Input:** `ns1001`

**Expected result:**
- Order is found successfully.
- The system handles lowercase input.

**Result:** PASS

---

## Returns & Refunds

### Test 7 — Delivered order eligible for return

**Input:** `NS1002`

**Expected result:**
- Order is found.
- Customer is informed that the order is eligible for return.
- 30-day return window is displayed.

**Result:** PASS

---

### Test 8 — Cancelled order

**Input:** `NS1005`

**Expected result:**
- Order is found.
- Customer is informed that the order was cancelled.
- Customer is informed that the refund has been issued.

**Result:** PASS

---

### Test 9 — Processing order

**Input:** `NS1003`

**Expected result:**
- Order is found.
- Customer is informed that the order cannot be returned yet.
- Customer is informed that the order must be delivered before starting a return.

**Result:** PASS

---

### Test 10 — Invalid order number

**Input:** `NS9999`

**Expected result:**
- No order result is displayed.
- A clear error message is displayed.

**Result:** PASS

---

### Test 11 — Empty order number

**Input:** Empty

**Expected result:**
- Search cannot be submitted.
- User is prompted to enter an order number.

**Result:** PASS

---

## Navigation

### Test 12 — Return to Support Center

**Action:** Click "Back to Support".

**Expected result:**
- User returns to the Support Center homepage.
- Both support options are visible.

**Result:** PASS

---

## Keyboard Interaction

### Test 13 — Search using Enter

**Action:** Enter a valid order number and press Enter.

**Expected result:**
- The order search is triggered.
- Correct order information is displayed.

**Result:** PASS

---

## Responsive Design

### Test 14 — Mobile layout

**Action:** Resize browser to a mobile-sized screen.

**Expected result:**
- Content remains readable.
- Buttons remain accessible.
- Input fields fit within the screen.
- Support cards remain usable.
- No horizontal scrolling occurs.

**Result:** PASS

---

## Overall QA Result

**Total test cases:** 14

**Passed:** 14

**Failed:** 0

**Overall status:** READY FOR DEMONSTRATION