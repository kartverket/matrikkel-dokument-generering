import type { i18n as I18n } from "i18next"

const defaultOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "long",
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function parseLocalizedDate(
  value: string,
  locale: string,
): Date | null | undefined {
  const pattern = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
    .formatToParts(new Date(Date.UTC(2006, 10, 22)))
    .map((part) => {
      switch (part.type) {
        case "day":
          return "(?<day>\\d{1,2})"
        case "month":
          return "(?<month>\\d{1,2})"
        case "year":
          return "(?<year>\\d{4})"
        default:
          return escapeRegExp(part.value)
      }
    })
    .join("")

  const match = new RegExp(`^${pattern}$`).exec(value.trim())
  if (!match?.groups) return undefined

  const day = Number(match.groups.day)
  const month = Number(match.groups.month)
  const year = Number(match.groups.year)
  const date = new Date(Date.UTC(year, month - 1, day))

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }

  return date
}

function parseDate(value: string | number | Date, locale: string): Date | null {
  if (typeof value === "string") {
    const localizedDate = parseLocalizedDate(value, locale)
    if (localizedDate !== undefined) return localizedDate
  }

  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(
  i18n: Pick<I18n, "language" | "t">,
  value: string | number | Date | null | undefined,
  fallback?: string,
  options: Intl.DateTimeFormatOptions = defaultOptions,
): string | undefined {
  if (value == null) return fallback ? fallback : undefined

  const date = parseDate(value, i18n.language)
  if (date === null) return fallback

  return i18n.t("formats.date", {
    val: date,
    formatParams: {
      val: {
        ...options,
        timeZone: "Europe/Oslo",
      },
    },
  })
}
