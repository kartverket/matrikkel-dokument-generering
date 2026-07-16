import type { TFunction } from "i18next"

export function formatArea(t: TFunction, value: number) {
  return t("formats.area", { val: value })
}

export function formatDateTime(value: string | number | Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Oslo",
  }).format(new Date(value))
}
