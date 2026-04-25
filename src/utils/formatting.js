/**
 * Formatting Utilities
 * Functions for formatting currency, numbers, and other display values
 */

import { CURRENCY_SYMBOL, DECIMAL_PLACES } from '../constants';

/**
 * Formats a number as currency
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return `${CURRENCY_SYMBOL}0.00`;
  }

  return `${CURRENCY_SYMBOL}${amount.toFixed(DECIMAL_PLACES)}`;
};

/**
 * Safely capitalizes the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalizeFirstLetter = (str) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
