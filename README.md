# 🛒 Redux Shopping Cart Application

| Field | Details |
|---|---|
| **Student Name** | kame missoman donald |
| **Student ID** | 24BCY70255 |
| **Experiment** | B7 |
| **Date** | April 2026 |

---

## 📌 Overview

A professional shopping cart application built using **React** and **Redux Toolkit**.  
This project demonstrates real-time state management, input validation, and persistent storage using LocalStorage.

---

## 🚀 Features

- ✅ Add products with proper input validation
- ✅ Remove items from cart
- ✅ Update product quantity dynamically
- ✅ Automatic total price calculation
- ✅ Data persistence using LocalStorage
- ✅ Responsive design for all devices
- ✅ Error handling with user-friendly messages

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React | UI components and rendering |
| Redux Toolkit | Global state management |
| React Redux | Connecting React with Redux store |
| CSS3 | Styling and responsive layout |

---

## 📂 Project Structure

```
src/
├── app/
│   └── store.js
├── components/
│   ├── CartItem.js
│   └── CartSummary.js
├── features/
│   └── cart/
│       └── cartSlice.js
├── utils/
│   └── localStorage.js
├── App.js
└── index.js
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone <your-repo-link>

# Navigate to project folder
cd project-folder

# Install dependencies
npm install

# Start the development server
npm start
```

---

## ▶️ Usage

1. Enter a **product name**, **price**, and **quantity**
2. Click **Add Item** to add it to the cart
3. Modify quantity directly in the cart
4. Click **Remove** to delete an item
5. View the **total price** updated in real-time

---

## 💾 Data Persistence

Cart data is stored using the browser's **LocalStorage API**.  
Data remains saved even after refreshing or closing the page.

```javascript
// Example: Saving cart to LocalStorage
localStorage.setItem('cart', JSON.stringify(cartState));

// Example: Loading cart from LocalStorage
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
```

---

## 🧠 Key Learnings

- React Hooks (`useState`, `useEffect`)
- Redux Toolkit state management (`createSlice`, `configureStore`)
- Form validation techniques
- Responsive UI design with CSS3
- LocalStorage API for data persistence

---

## 📸 Screenshots

> _Add screenshots of your app here_

---

## 👨‍💻 Author

**kame missoman donald**  
Student ID: `24BCY70255`  
Experiment: B7 — React & Redux Toolkit
