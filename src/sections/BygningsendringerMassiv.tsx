import { useTranslation } from "react-i18next"
import EndringsTabell from "../components/EndringsTabell.tsx"
import { Section } from "../components/Section.tsx"
import type { BygningMassiv } from "../lib/schema/reports/bygg/byg0001/bygningMassiv.schema.ts"

type NonNullBygningMassiv = NonNullable<BygningMassiv>
type Bygningsendring = NonNullable<
  NonNullable<NonNullBygningMassiv["bygningsendringer"]>[number]
>

interface Props {
  index: number
  bygning: NonNullBygningMassiv
  bygningIndeks: number
  antallBygninger: number
}

function harLopeNr(
  e: Bygningsendring | undefined,
): e is Bygningsendring & { lopeNr: number } {
  return e !== undefined && e.lopeNr !== undefined
}

export default function BygningsendringerMassiv({
  index,
  bygning,
  bygningIndeks,
  antallBygninger,
}: Props) {
  const { t } = useTranslation()
  const tKey = "rapport.BYG0011.byggEndringer" as const

  const endringer = (bygning.bygningsendringer ?? [])
    .filter(harLopeNr)
    .toSorted((a, b) => a.lopeNr - b.lopeNr)

  // Grunnopplysninger per bygningsendring — samme visuelle mønster som
  // BYG0011 sin `byggMetaEndring`, men lest fra BygningMassiv sine flate felt.
  const metaEndringer = endringer.map((e) => ({
    lopeNr: e.lopeNr,
    endringsKode: e.endringsKode
      ? t(`koder.endring.${e.endringsKode}`)
      : undefined,
    bygningsStatusKode: e.bygningsStatusKode
      ? t(`koder.bygningsstatus.${e.bygningsStatusKode}`)
      : undefined,
    antallBoenheter: e.antallBoenheter,
    naringsgruppeKode: e.naringsgruppeKode
      ? t(`koder.naringsgruppe.${e.naringsgruppeKode}`)
      : undefined,
  }))

  // Vedtak/datoer per bygningsendring — gjenbruker `byggDatoEndring`-oppsettet.
  const datoEndringer = endringer
    .filter((e) => e.byggEndringDatoer !== undefined)
    .map((e) => ({ lopeNr: e.lopeNr, ...e.byggEndringDatoer }))

  // Antall bygninger brukes ikke i visningen, men holdes i propsene for
  // symmetri med de andre seksjonene og fremtidig utvidelse.
  void antallBygninger

  return (
    <Section
      index={index}
      title={t(`${tKey}.tittel`)}
      showTitle={bygningIndeks === 1}
    >
      <EndringsTabell endringer={metaEndringer} seksjon="byggMetaEndring" />
      <EndringsTabell endringer={datoEndringer} seksjon="byggDatoEndring" />
    </Section>
  )
}
