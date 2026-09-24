/**
 * Formats a number to a shortened string representation (e.g., 12.8M, 125K)
 */
export function formatCurrencyShort(value: number): string {
  if (value >= 1000000) {
    return `Rs. ${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `Rs. ${(value / 1000).toFixed(1)}K`;
  }
  return `Rs. ${value.toString()}`;
}

/**
 * Formats a number with standard thousands separators
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
