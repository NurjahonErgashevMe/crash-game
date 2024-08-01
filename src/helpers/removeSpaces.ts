export function removeSpacesOnWord(str: string): string {
  return str
    .split("")
    .filter((i) => i.trim() !== "")
    .join("");
}
