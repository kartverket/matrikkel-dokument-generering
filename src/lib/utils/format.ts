export function formatArea(value: number) {
  return `${value} m²`
}

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "long",
  timeStyle: "short",
}

export function formatDateTime(
  value: string | number | Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = dateTimeOptions,
) {
  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: "Europe/Oslo",
  }).format(parseDate(value))
}

function parseDate(value: string | number | Date) {
  if (typeof value === "string") {
    const norskDato = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value)

    if (norskDato) {
      const [, dag, maaned, aar] = norskDato
      return new Date(`${aar}-${maaned}-${dag}T12:00:00Z`)
    }
  }

  return new Date(value)
}
