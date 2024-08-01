/**
 * Formats a given input value to ensure it contains at most 3 digits before the decimal point
 * and at most 2 digits after the decimal point. Also ensures that only digits and a single decimal
 * point are allowed.
 *
 * @param {string} value - The input value to format.
 * @returns {string} - The formatted value.
 */
export function formatInputValue(value: string, maxLength: number = 3) {
  // Remove any characters other than digits and a single dot
  if (/^[\d.]*$/.test(value)) {
    const parts = value.split(".");

    // Ensure only up to two digits after the dot
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + "." + parts[1].slice(0, 2);
    }

    // Ensure length does not exceed 3 characters before the dot
    if (parts[0].length > maxLength) {
      value = parts[0].slice(0, maxLength) + (parts[1] ? "." + parts[1] : "");
    }

    return value;
  }

  // Return the value as is if it does not match the allowed format
  return value;
}
