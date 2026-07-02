import type { EndringType } from "../types"
import type { Datoer } from "../types"

const datoLabels: Record<keyof Datoer, string> = {
  rammetillatelse: "Rammetillatelse",
  igangsettingstillatelse: "Igangsettingstillatelse",
  midlertidigBrukstillatelse: "Midlertidig brukstillatelse",
  ferdigattest: "Ferdigattest",
  tattIBruk: "Tatt i bruk",
  utgaattRevet: "Utgått/revet",
}

export function Endring({
  lopenr,
  endringskode,
  bygningsstatus,
  bruksareal,
  bebygdAreal,
  datoer,
  etasjeplan,
  bruksenheter,
  hjemmelshavere,
  tiltakshavere,
}: EndringType) {
  const tittel =
    lopenr === null ? "Opprinnelig bygg" : `Endring ${lopenr} – ${endringskode}`

  return (
    <div>
      <h3>{tittel}</h3>
      <p>Status: {bygningsstatus}</p>
      <p>Bebygd areal: {bebygdAreal} m²</p>
      <p>Bruksareal totalt: {bruksareal.totalt} m²</p>

      <div>
        <h4>Datoer</h4>
        <table>
          <tbody>
            {(
              Object.entries(datoer) as unknown as [
                keyof Datoer,
                string | null,
              ][]
            ).map(([key, val]) =>
              val ? (
                <tr key={key}>
                  <td>{datoLabels[key]}</td>
                  <td>{val}</td>
                </tr>
              ) : null,
            )}
          </tbody>
        </table>
      </div>

      <div>
        <h4>Etasjeplan</h4>
        <table>
          <thead>
            <tr>
              <th>Etasje</th>
              <th>Type</th>
              <th>BRA totalt</th>
            </tr>
          </thead>
          <tbody>
            {etasjeplan.map((e) => (
              <tr key={e.etasje}>
                <td>{e.etasje}</td>
                <td>{e.etasjeplan}</td>
                <td>{e.bruksareal.totalt} m²</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bruksenheter.length > 0 && (
        <>
          <h4>Bruksenheter</h4>
          {bruksenheter.map((b) => (
            <p key={b.bruksenhetsnr ?? b.type}>
              {b.type}
              {b.bruksenhetsnr ? ` (${b.bruksenhetsnr})` : ""}
              {b.adresse ? ` – ${b.adresse}` : ""}
            </p>
          ))}
        </>
      )}

      {hjemmelshavere.length > 0 && (
        <>
          <h4>Hjemmelshavere</h4>
          {hjemmelshavere.map((h) => (
            <p key={h.navn}>
              {h.navn}
              {h.adresse ? ` – ${h.adresse}` : ""}
            </p>
          ))}
        </>
      )}

      {tiltakshavere && tiltakshavere.length > 0 && (
        <>
          <h4>Tiltakshavere</h4>
          {tiltakshavere.map((t) => (
            <p key={t.navn}>{t.navn}</p>
          ))}
        </>
      )}
    </div>
  )
}
