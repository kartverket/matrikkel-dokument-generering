import type { TFunction } from "i18next"

const defaultOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "long",
}

export function formatDate(
  t: TFunction,
  value: string | number | Date | null | undefined,
  fallback: string,
  options: Intl.DateTimeFormatOptions = defaultOptions,
): string {
  if (value == null) return fallback
  return t("formats.date", {
    val: value instanceof Date ? value : new Date(value),
    formatParams: {
      val: {
        ...options,
        timeZone: "Europe/Oslo",
      },
    },
  })
}
