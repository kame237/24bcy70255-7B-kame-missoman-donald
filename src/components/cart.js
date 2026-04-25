/**
 * Cart Component
 * Main shopping cart interface for managing products
 * Features: Add items, update quantities, remove items, and view total
 */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, addItem } from "../features/cart/cartSlice";
import { validateCartItem } from "../utils/validation";
import { formatCurrency } from "../utils/formatting";
import { STORAGE_KEYS } from "../constants";
import "./cart.css";

/**
 * Cart Component
 * @returns {JSX.Element} The cart component with form and table
 */
const Cart = () => {
  // ===== State Management =====
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // ===== Redux State & Dispatch =====
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // ===== Effects =====
  /**
   * Sync cart state to localStorage whenever items change
   */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  /**
   * Clear success message after 3 seconds
   */
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // ===== Calculations =====
  /**
   * Calculate total price of all items in cart
   */
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ===== Event Handlers =====
  /**
   * Handles adding a new item to the cart
   * Validates input before dispatching action
   */
  const handleAddItem = () => {
    // Validate all fields
    const validation = validateCartItem(name, price, quantity);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Clear previous errors
    setErrors({});

    // Dispatch action to add item
    dispatch(
      addItem({
        id: Date.now(),
        name: name.trim(),
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      })
    );

    // Reset form and show success message
    setName("");
    setPrice("");
    setQuantity("");
    setSuccessMessage(`Added "${name}" to cart!`);
  };

  /**
   * Handles removing an item from the cart
   * @param {number} id - Item ID to remove
   */
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    setSuccessMessage("Item removed from cart");
  };

  /**
   * Handles updating item quantity
   * @param {number} id - Item ID to update
   * @param {string} newQuantity - New quantity value
   */
  const handleQuantityChange = (id, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (qty > 0) {
      dispatch(updateQuantity({ id, quantity: qty }));
    }
  };

  /**
   * Handles form submission (Enter key)
   * @param {Event} e - Keyboard event
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  // ===== Render =====
  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="subtitle">Manage your products efficiently</p>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message" role="alert">
          ✓ {successMessage}
        </div>
      )}

      {/* Add Product Form */}
      <section className="add-product-section">
        <h2>Add Product</h2>
        <div className="form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label="Product name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span className="error" id="name-error">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Price ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyPress={handleKeyPress}
              step="0.01"
              min="0"
              aria-label="Product price"
              aria-invalid={!!errors.price}
              aria-describedby={errors.price ? "price-error" : undefined}
            />
            {errors.price && (
              <span className="error" id="price-error">
                {errors.price}
              </span>
            )}
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onKeyPress={handleKeyPress}
              min="1"
              aria-label="Product quantity"
              aria-invalid={!!errors.quantity}
              aria-describedby={errors.quantity ? "quantity-error" : undefined}
            />
            {errors.quantity && (
              <span className="error" id="quantity-error">
                {errors.quantity}
              </span>
            )}
          </div>

          <button
            className="add-btn"
            onClick={handleAddItem}
            aria-label="Add product to cart"
          >
            Add Item
          </button>
        </div>
      </section>

      {/* Cart Table */}
      <section className="cart-section">
        <h2>Cart Items ({cart.length})</h2>
        
        {cart.length === 0 ? (
          <div className="empty-cart" role="status">
            <p>Your cart is empty</p>
            <p className="subtitle">Add some products to get started!</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="cart-table" role="grid" aria-label="Shopping cart items">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col" className="text-right">Price</th>
                  <th scope="col" className="text-center">Quantity</th>
                  <th scope="col" className="text-right">Subtotal</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="cart-item-row">
                    <td data-label="Product">{item.name}</td>
                    <td data-label="Price" className="text-right">
                      {formatCurrency(item.price)}
                    </td>

                    <td data-label="Quantity" className="text-center">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        max="999"
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        aria-label={`Quantity for ${item.name}`}
                        className="quantity-input"
                      />
                    </td>

                    <td data-label="Subtotal" className="text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </td>

                    <td data-label="Actions" className="text-center">
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        title="Remove this item"
                      >
                        ✕ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="cart-summary">
          <div className="total-section">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span className="price">{formatCurrency(total)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Total:</span>
              <span className="total-price">{formatCurrency(total)}</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;