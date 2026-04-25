/**
 * Cart Slice
 * Redux slice for managing shopping cart state
 * Handles adding, removing, and updating items in the cart
 */

import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS, DEFAULT_ITEMS } from "../../constants";

/**
 * Initialize cart state from localStorage or use default items
 * @returns {object} Initial state with cart items
 */
const initializeCartState = () => {
  try {
    const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
    return {
      items: storedCart ? JSON.parse(storedCart) : DEFAULT_ITEMS,
    };
  } catch (error) {
    console.warn("Failed to load cart from localStorage:", error);
    return { items: DEFAULT_ITEMS };
  }
};

const initialState = initializeCartState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Adds an item to the cart or increments quantity if item already exists
     * @param {object} state - Current Redux state
     * @param {object} action - Redux action with payload { id, name, price, quantity }
     */
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push(action.payload);
      }
    },

    /**
     * Removes an item from the cart by ID
     * @param {object} state - Current Redux state
     * @param {object} action - Redux action with id as payload
     */
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    /**
     * Updates the quantity of a cart item
     * @param {object} state - Current Redux state
     * @param {object} action - Redux action with payload { id, quantity }
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    /**
     * Clears all items from the cart
     * @param {object} state - Current Redux state
     */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;