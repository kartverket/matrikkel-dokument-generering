import { I18nextProvider } from "react-i18next"
import { Byg0001Document } from "./documents/Byg0001Document.tsx"
import { Byg0011Document } from "./documents/Byg0011Document.tsx"
import { createI18n } from "./lib/i18n/createI18n.ts"
import type { Byg0001Rapport } from "./lib/schema/reports/bygg/byg0001/bygningMassivRapport.schema.ts"
import type { Byg0011Rapport } from "./lib/schema/reports/bygg/byg0011/byggRapport.schema.ts"
import "./index.css"

type AnyRapport = Byg0011Rapport | Byg0001Rapport

const mockModules = import.meta.glob<{ default: AnyRapport }>("./mock/*.ts", {
  eager: true,
})
const mocks = Object.values(mockModules).map((module) => module.default)

function pickMock(): AnyRapport | undefined {
  const requested = new URLSearchParams(window.location.search)
    .get("rapport")
    ?.toUpperCase()
  return mocks.find((rapport) => rapport.rapportKode === requested) ?? mocks[0]
}

const mockData = pickMock()

function renderRapport(rapport: AnyRapport) {
  switch (rapport.rapportKode) {
    case "BYG0011":
      return <Byg0011Document rapport={rapport} />
    case "BYG0001":
      return <Byg0001Document rapport={rapport} />
  }
}

function App() {
  if (!mockData) {
    return (
      <section className="flex h-screen w-screen items-center justify-center font-bold text-2xl text-red-700">
        <h1>Ingen mockdata funnet</h1>
      </section>
    )
  }

  const i18n = createI18n(mockData.locale)
  return (
    <I18nextProvider i18n={i18n}>{renderRapport(mockData)}</I18nextProvider>
  )
}

export default App
