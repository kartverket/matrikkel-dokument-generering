export function joinStrings(
  parts: (string | null | undefined)[],
  separator: string,
  emptyValue: string,
): string {
  const value = parts.filter((p) => p != null && p !== "").join(separator)
  return value.length > 0 ? value : emptyValue
}
