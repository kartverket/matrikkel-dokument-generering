interface DetaljVerdi {
  value: string
  erTom: boolean
}

export function getDetaljVerdi(
  value: string | null | undefined,
  tom: string,
): DetaljVerdi {
  return {
    value: value ?? tom,
    erTom: value == null,
  }
}
