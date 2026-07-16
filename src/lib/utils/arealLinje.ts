export function arealLinje(a: { bolig: number; annet: number }): string {
  return `${a.bolig} / ${a.annet} / ${summerAreal(a)} m²`
}

export function summerAreal(a: { bolig: number; annet: number }): number {
  return a.bolig + a.annet
}
