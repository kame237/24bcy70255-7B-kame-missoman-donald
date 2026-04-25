/**
 * Redux Store Configuration
 * Centralizes the Redux store setup for the shopping cart application
 * Uses Redux Toolkit for simplified state management
 */

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

/**
 * Configure and create Redux store
 * @type {Store}
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["cart/addItem"],
        ignoredPaths: ["cart.items[*].id"],
      },
    }),
});