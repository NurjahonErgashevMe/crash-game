/**
 * Returns the color associated with a coefficient based on its value.
 *
 * This function determines the color based on the provided coefficient value. The color is chosen according to the following rules:
 * - If the coefficient is less than or equal to 2, the color for "low" is returned.
 * - If the coefficient is greater than or equal to 10, the color for "large" is returned.
 * - For coefficients between 2 and 10 (exclusive), the color for "medium" is returned.
 *
 * The colors are retrieved from the `Colors` enum, which defines color codes for different ranges.
 *
 * @param {number} coefficient - The coefficient value to determine the color for.
 * @returns {Colors} - The color corresponding to the coefficient value.
 */
import { Colors } from "@/types/enums";

export const getCoefficentColor = (coefficient: number) =>
  coefficient <= 2
    ? Colors["low"]
    : coefficient >= 10
    ? Colors["large"]
    : Colors["medium"];
