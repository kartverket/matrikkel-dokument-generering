export function arealLinje(a: {
  bolig: number
  annet: number
  totalt: number
}): string {
  return `${a.bolig} / ${a.annet} / ${a.totalt} m²`
}
