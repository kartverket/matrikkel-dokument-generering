export function formatAreal(
  value: number | undefined,
  enhet: string,
): string | undefined {
  return value != null ? `${value} ${enhet}` : undefined
}
