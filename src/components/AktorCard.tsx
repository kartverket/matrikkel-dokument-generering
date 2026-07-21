import { Card, Paragraph, Tag } from "@kv-designsystem/react"
import type { TFunction } from "i18next"
import { useTranslation } from "react-i18next"
import { oversettKode } from "../lib/i18n/koder/oversettKode.ts"
import type { Aktor } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"
import { Detaljgrid, lagDetaljfeltBuilder } from "./Detaljfelt.tsx"

interface Props {
  aktor: Aktor
}

const translationKey = "rapport.BYG0011.hjemmelshavere"
const aktorFelt = lagDetaljfeltBuilder(translationKey)

function getAktorDetaljfelter(aktor: Aktor, t: TFunction) {
  return [
    aktorFelt("identifikasjonsNr", aktor.identifikasjonsNr),
    aktorFelt("andel", aktor.andel),
    aktorFelt("adresse", aktor.adresse),
    aktorFelt("bruksenhetsnr", aktor.bruksenhetsNr),
    aktorFelt(
      "kategori",
      oversettKode({ t, kodeverk: "aktoer", kode: aktor.aktorKode }),
    ),
  ]
}

export function AktorCard({ aktor }: Props) {
  const { t } = useTranslation()
  const tom = t("tom")

  return (
    <Card className="pdf-keep-together min-w-0">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Paragraph className="wrap-break-word min-w-0 font-semibold">
          {aktor.navn ?? tom}
        </Paragraph>
        <Tag data-color={aktor.erAvdoed ? "danger" : "success"}>
          {aktor.erAvdoed ? t(`${translationKey}.utgatt`) : tom}
        </Tag>
      </div>

      <Detaljgrid
        className="[&_dd]:wrap-anywhere grid-cols-1 *:min-w-0 sm:grid-cols-2 xl:grid-cols-3"
        felter={getAktorDetaljfelter(aktor, t)}
        tom={tom}
      />
    </Card>
  )
}
