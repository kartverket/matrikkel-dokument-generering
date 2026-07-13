export function formatArea(value: number) {
  return `${value} m²`
}

export function formatDateTime(
  value: string | number | Date,
  locale: string,
) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Oslo",
  }).format(new Date(value))
}