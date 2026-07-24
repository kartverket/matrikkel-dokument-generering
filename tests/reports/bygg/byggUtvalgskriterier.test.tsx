import { describe, expect, test } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"
import { I18nextProvider } from "react-i18next"
import { createI18n } from "../../../src/lib/i18n/createI18n.ts"
import type { ByggUtvalgskriterier as Utvalgskriterier } from "../../../src/lib/schema/reports/bygg/shared/byggUtvalgskriterier.schema.ts"
import { ByggUtvalgskriterier } from "../../../src/sections/ByggUtvalgskriterier.tsx"

function renderUtvalgskriterier(kriterier: NonNullable<Utvalgskriterier>) {
  const i18n = createI18n("nb")

  return renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <ByggUtvalgskriterier index={1} kriterier={kriterier} />
    </I18nextProvider>,
  )
}

describe("ByggUtvalgskriterier", () => {
  test("viser bare valgte kriterier, men beholder false og 0", () => {
    const html = renderUtvalgskriterier({
      omfang: { inkluderUtgaatteBygg: false },
      bygning: { lopeNr: 0, bygningstyper: [] },
      adresse: { adresseNr: 0, utenBokstav: false },
      matrikkelenhet: { snr: 0 },
      aktor: { fornavn: "Ola" },
      bygningsstatus: { naavaerende: [], tidligere: [] },
      subrapporter: { inkluderBruksenheter: false },
    })

    expect(html).toContain("Utgåtte bygg")
    expect(html).not.toContain("Bestående bygg")
    expect(html).toContain("Løpenr")
    expect(html).not.toContain("Bygningstyper")
    expect(html).toContain("Uten bokstav")
    expect(html).not.toContain("Adressekode")
    expect(html).toContain("Snr")
    expect(html).not.toContain("Gnr")
    expect(html).toContain("Fornavn")
    expect(html).not.toContain("Etternavn")
    expect(html).not.toContain("Bygningsstatus")
    expect(html).toContain("Bruksenheter")
    expect(html).toContain(">0<")
    expect(html).toContain(">Nei<")
    expect(html.toLocaleLowerCase("nb-NO")).not.toContain("ikke angitt")
  })

  test("beholder intervallvisningen for søkevinduet", () => {
    const html = renderUtvalgskriterier({
      sokevindu: {
        nord: 6642200,
        ost: 597500,
        syd: 6642000,
        vest: 597300,
      },
    })

    expect(html.match(/aria-hidden="true"/g)).toHaveLength(2)
    expect(html.match(/h-0.5 flex-1 bg-kv-blue/g)).toHaveLength(2)
  })

  test("skjuler søkevinduet når alle koordinatene er 0", () => {
    const html = renderUtvalgskriterier({
      sokevindu: {
        nord: 0,
        ost: 0,
        syd: 0,
        vest: 0,
      },
    })

    expect(html).not.toContain("Søkevindu")
  })
})
