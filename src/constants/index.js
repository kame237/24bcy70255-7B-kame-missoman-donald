/**
 * Application Constants
 * Centralized configuration values for the shopping cart application
 */

export const ITEM_ERRORS = {
  INVALID_NAME: 'Product name is required',
  INVALID_PRICE: 'Price must be a positive number',
  INVALID_QUANTITY: 'Quantity must be at least 1',
  MISSING_FIELDS: 'Please fill in all fields',
  INVALID_PRICE_FORMAT: 'Price must be a valid number',
};

export const VALIDATION_CONFIG = {
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 999,
  MIN_PRICE: 0.01,
  MAX_PRICE: 999999.99,
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 100,
};

export const STORAGE_KEYS = {
  CART: 'cart',
};

export const DEFAULT_ITEMS = [
  { id: 1, name: 'Smartphone', price: 299.99, quantity: 1 },
  { id: 2, name: 'Tablet', price: 449.99, quantity: 2 },
  { id: 3, name: 'Smartwatch', price: 199.99, quantity: 1 },
];

export const CURRENCY_SYMBOL = '$';
export const DECIMAL_PLACES = 2;
