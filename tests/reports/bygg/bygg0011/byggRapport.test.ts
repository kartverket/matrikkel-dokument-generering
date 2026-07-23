import { describe, expect, test } from "bun:test"
import mockByggRapport from "../../../../src/mock/byggRapport.ts"

describe("mockByggRapport", () => {
  test("har etasjesummer som samsvarer med byggets BRA og BTA", () => {
    for (const bygning of mockByggRapport.bygninger) {
      for (const endring of bygning.endringer) {
        const etasjer = endring?.etasjePlan.filter(
          (etasje) => etasje !== undefined,
        )
        const bra = etasjer?.reduce(
          (sum, etasje) => sum + (etasje.bruksareal.totaltAreal ?? 0),
          0,
        )
        const bta = etasjer?.reduce(
          (sum, etasje) => sum + (etasje.bruttoareal.totaltAreal ?? 0),
          0,
        )

        expect(bra).toBe(endring?.byggArealEndring?.bruksarealBolig.totaltAreal)
        expect(bta).toBe(
          endring?.byggArealEndring?.bruttoarealBolig.totaltAreal,
        )
      }
    }
  })
})
