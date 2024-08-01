export function formatNumberWithSpaces(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
export function formatStringWithSpaces(string: string) {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
