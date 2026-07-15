import { Fragment } from "react"
import ArealFordeling from "./components/ArealFordeling.tsx"
import type { ByggRapport } from "./lib/schema/byggRapportSchema"
import Bruksenheter from "./sections/Bruksenheter.tsx"
import { Bygningslinje } from "./sections/Bygningslinje.tsx"
import { EtasjerSection } from "./sections/Etasjer.tsx"
import { Hjemmelshavere } from "./sections/Hjemmelshavere.tsx"
import { KontaktPersoner } from "./sections/KontaktPersoner.tsx"
import { Metadata } from "./sections/Metadata.tsx"
import RegistrerteVedtak from "./sections/RegistrerteVedtak.tsx"
import { Tiltakshavere } from "./sections/Tiltakshavere.tsx"
import { Utvalgskriterier } from "./sections/Utvalgskriterier.tsx"

export function DocumentComponent({ data }: { data: ByggRapport }) {
  return (
    <>
      <Metadata data={data} />
      <Utvalgskriterier kriterier={data.utvalgskriterier} />
      {data.bygninger.map((bygning) => (
        <Fragment key={bygning.id}>
          <Bygningslinje bygning={bygning} />
          <EtasjerSection etasjeEndringer={bygning.endringer} />
          <Bruksenheter bruksenheter={bygning.bruksenheter} />

          {bygning.endringer.map((endring) => (
            <Fragment key={endring.id}>
              <ArealFordeling endring={endring} />
              {endring.bruksenheter.length > 0 && (
                <>
                  <RegistrerteVedtak datoer={endring.datoer} />
                  <KontaktPersoner kontaktpersoner={endring.kontaktpersoner} />
                  <Hjemmelshavere hjemmelshavere={endring.hjemmelshavere} />
                </>
              )}
              {data.utvalgskriterier.subrapporter.tiltakshavere && (
                <Tiltakshavere endring={endring} />
              )}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </>
  )
}
