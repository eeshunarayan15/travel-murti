/**
 * Format a title string (e.g., capitalize words, trim)
 */
export const formatTitle = (str) => {
  if (!str || typeof str !== "string") return "";
  return str
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
