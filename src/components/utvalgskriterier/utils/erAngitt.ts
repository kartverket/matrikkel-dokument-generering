// Returner hvorvidt et utvalgskriterie har blitt valgt/angitt.
export function erAngitt<T>(
  verdi: T | null | undefined,
): verdi is NonNullable<T> {
  return (
    verdi !== null &&
    verdi !== undefined &&
    (!Array.isArray(verdi) || verdi.length > 0)
  )
}

// Returner hvorvidt en kategori av utvalgskriterier har blitt valgt/angitt.
export function harAngittVerdi(
  kriterier: Record<string, unknown> | null | undefined,
): boolean {
  return (
    kriterier !== null &&
    kriterier !== undefined &&
    Object.values(kriterier).some(erAngitt)
  )
}
