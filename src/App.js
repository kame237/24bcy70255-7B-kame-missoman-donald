/**
 * App Component
 * Root component of the shopping cart application
 * Renders the main Cart component
 */

import React from "react";
import Cart from "./components/cart.js";

/**
 * Main App Component
 * @returns {JSX.Element} The main application component
 */
function App() {
  return (
    <main>
      <Cart />
    </main>
  );
}

export default App;