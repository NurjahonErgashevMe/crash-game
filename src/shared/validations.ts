import { NUMBER_AND_DOT_REGEX, NUMBER_AND_DOT_SPACE_REGEX } from "./regexp";

export function isValidNumber(input: string) {
  return NUMBER_AND_DOT_REGEX.test(input);
}
export function isValidNumberWithSpaces(input: string) {
  return NUMBER_AND_DOT_SPACE_REGEX.test(input);
}
