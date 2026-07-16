import { expect, test } from "bun:test"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { createI18n } from "../../src/lib/i18n/createI18n.ts"
import mockByggRapport from "../../src/mock/byggRapport.ts"
import Bruksenheter from "../../src/sections/Bruksenheter.tsx"

function render(bruksenheter = mockByggRapport.bygninger[0].bruksenheter) {
  return renderToStaticMarkup(
    createElement(
      I18nextProvider,
      { i18n: createI18n("nb") },
      createElement(Bruksenheter, { index: 4, bruksenheter }),
    ),
  )
}

test("viser tomtilstand basert på endringene til hver bruksenhet", () => {
  const html = render(mockByggRapport.bygninger[0].bruksenheter.slice(0, 1))

  expect(html).toContain("Ingen registrerte endringer på bruksenheten.")
  expect(html).not.toContain("ENDRINGER PÅ BRUKSENHETEN")
})

test("skjuler seksjonen når rapporten ikke har bruksenheter", () => {
  expect(render([])).toBe("")
})
