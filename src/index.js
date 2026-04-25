/**
 * Application Entry Point
 * Bootstraps the React application with Redux store
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

/**
 * Get or create root DOM element
 */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element with id "root" not found in HTML');
}

/**
 * Create React root and render application
 */
const root = ReactDOM.createRoot(rootElement);

/**
 * Render App wrapped with Redux Provider
 * Provides Redux store to all components
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);