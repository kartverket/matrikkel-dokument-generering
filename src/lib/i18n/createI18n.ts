import i18next, { type i18n as I18n } from "i18next"
import { initReactI18next } from "react-i18next"
import type { RapportLocale } from "../schema/core/locale.schema"
import { nb } from "./resources.nb"
import { nn } from "./resources.nn"

const resources = {
  nb: { translation: nb },
  nn: { translation: nn },
} as const

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation"
    resources: { translation: typeof nb }
  }
}

export function createI18n(locale: RapportLocale): I18n {
  const instance = i18next.createInstance()
  instance.use(initReactI18next).init({
    lng: locale,
    resources,
    interpolation: { escapeValue: false },
    initAsync: false,
  })
  return instance
}
