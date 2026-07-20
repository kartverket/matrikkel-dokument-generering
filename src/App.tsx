import { I18nextProvider } from "react-i18next"
import { DocumentComponent } from "./Document.tsx"
import { createI18n } from "./lib/i18n/createI18n.ts"
import type { Byg0011Rapport as ByggRapport } from "./lib/schema/reports/bygg/byg0011/byg0011.schema.ts"
import "./index.css"

const mockModules = import.meta.glob<{ default: ByggRapport }>("./mock/*.ts", {
  eager: true,
})
const mockData = Object.values(mockModules)[0]?.default

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
    <I18nextProvider i18n={i18n}>
      <DocumentComponent data={mockData} />
    </I18nextProvider>
  )
}

export default App
