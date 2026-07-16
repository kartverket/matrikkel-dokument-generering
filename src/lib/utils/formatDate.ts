import type { TFunction } from "i18next"

const defaultOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "long",
}

function parseDate(value: string | number | Date): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  if (typeof value === "string") {
    const norwegianDate = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(value.trim())

    if (norwegianDate) {
      const [, dayString, monthString, yearString] = norwegianDate
      const day = Number(dayString)
      const month = Number(monthString)
      const year = Number(yearString)
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
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(
  t: TFunction,
  value: string | number | Date | null | undefined,
  fallback: string,
  options: Intl.DateTimeFormatOptions = defaultOptions,
): string {
  if (value == null) return fallback

  const date = parseDate(value)
  if (date === null) return fallback

  return t("formats.date", {
    val: date,
    formatParams: {
      val: {
        ...options,
        timeZone: "Europe/Oslo",
      },
    },
  })
}
