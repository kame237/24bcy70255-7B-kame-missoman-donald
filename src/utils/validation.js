/**
 * Validation Utilities
 * Common validation functions for the shopping cart application
 */

import { VALIDATION_CONFIG, ITEM_ERRORS } from '../constants';

/**
 * Validates product name
 * @param {string} name - Product name to validate
 * @returns {object} - {isValid: boolean, error: string|null}
 */
export const validateProductName = (name) => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: ITEM_ERRORS.INVALID_NAME };
  }

  if (name.length > VALIDATION_CONFIG.MAX_NAME_LENGTH) {
    return {
      isValid: false,
      error: `Product name cannot exceed ${VALIDATION_CONFIG.MAX_NAME_LENGTH} characters`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validates product price
 * @param {string|number} price - Product price to validate
 * @returns {object} - {isValid: boolean, error: string|null}
 */
export const validatePrice = (price) => {
  const numPrice = Number(price);

  if (isNaN(numPrice) || price === '') {
    return { isValid: false, error: ITEM_ERRORS.INVALID_PRICE_FORMAT };
  }

  if (numPrice < VALIDATION_CONFIG.MIN_PRICE) {
    return { isValid: false, error: ITEM_ERRORS.INVALID_PRICE };
  }

  if (numPrice > VALIDATION_CONFIG.MAX_PRICE) {
    return {
      isValid: false,
      error: `Price cannot exceed $${VALIDATION_CONFIG.MAX_PRICE}`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validates product quantity
 * @param {string|number} quantity - Product quantity to validate
 * @returns {object} - {isValid: boolean, error: string|null}
 */
export const validateQuantity = (quantity) => {
  const numQuantity = Number(quantity);

  if (isNaN(numQuantity) || quantity === '') {
    return { isValid: false, error: ITEM_ERRORS.INVALID_QUANTITY };
  }

  if (numQuantity < VALIDATION_CONFIG.MIN_QUANTITY) {
    return { isValid: false, error: ITEM_ERRORS.INVALID_QUANTITY };
  }

  if (numQuantity > VALIDATION_CONFIG.MAX_QUANTITY) {
    return {
      isValid: false,
      error: `Quantity cannot exceed ${VALIDATION_CONFIG.MAX_QUANTITY}`,
    };
  }

  if (!Number.isInteger(numQuantity)) {
    return { isValid: false, error: 'Quantity must be a whole number' };
  }

  return { isValid: true, error: null };
};

/**
 * Validates all cart item fields
 * @param {string} name - Product name
 * @param {string|number} price - Product price
 * @param {string|number} quantity - Product quantity
 * @returns {object} - {isValid: boolean, errors: object}
 */
export const validateCartItem = (name, price, quantity) => {
  const errors = {};

  const nameValidation = validateProductName(name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }

  const priceValidation = validatePrice(price);
  if (!priceValidation.isValid) {
    errors.price = priceValidation.error;
  }

  const quantityValidation = validateQuantity(quantity);
  if (!quantityValidation.isValid) {
    errors.quantity = quantityValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
