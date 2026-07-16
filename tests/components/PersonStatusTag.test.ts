import { expect, test } from "bun:test"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { PersonStatusTag } from "../../src/components/bruksenheter/PersonStatusTag.tsx"

test("viser utgåtte personer med farestatus", () => {
  const html = renderToStaticMarkup(
    createElement(PersonStatusTag, {
      erUtgatt: true,
      statuskode: "AKTIV",
      utgattLabel: "Utgått",
      tom: "tom",
    }),
  )

  expect(html).toContain('data-color="danger"')
  expect(html).toContain("Utgått")
  expect(html).not.toContain("AKTIV")
})
