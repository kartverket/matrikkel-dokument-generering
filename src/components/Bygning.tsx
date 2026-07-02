// components/Bygning.tsx
import { Endring } from "./Endring"
import type { BygningType } from "../types"

export function Bygning({
  bygningsnr,
  bygningstype,
  matrikkelenhet,
  endringer,
}: BygningType) {
  return (
    <div>
      <hr />
      <h2>Bygningsnummer: {bygningsnr}</h2>
      <p>Bygningstype: {bygningstype.navn}</p>
      <p>Matrikkelenhet: {matrikkelenhet}</p>
      {endringer.map((endring) => (
        <Endring key={endring.lopenr} {...endring} />
      ))}
    </div>
  )
}