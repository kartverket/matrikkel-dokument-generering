export type Rapport = {
  rapportType: string
  tittel: string
  kommune: { nr: string; navn: string }
  koordinatsystem: string
  generertTidspunkt: string
  bygninger: BygningType[]
}

export type BygningType = {
  bygningsnr: string
  bygningstype: { kode: string; navn: string }
  matrikkelenhet: string
  endringer: EndringType[]
}

export type Datoer = {
  rammetillatelse: string | null
  igangsettingstillatelse: string | null
  midlertidigBrukstillatelse: string | null
  ferdigattest: string | null
  tattIBruk: string | null
  utgaattRevet: string | null
}

export type EndringType = {
  lopenr: number | null
  endringskode: string | null
  bygningsstatus: string
  bruksareal: { bolig: number; annet: number; totalt: number }
  bebygdAreal: number
  datoer: Datoer[]
  etasjeplan: Etasje[]
  bruksenheter: Bruksenhet[]
  hjemmelshavere: Person[]
  tiltakshavere?: Person[]
}

export type Etasje = {
  etasjeplan: string
  etasje: number
  bruksareal: { bolig: number; annet: number; totalt: number }
}

export type Bruksenhet = {
  bruksenhetsnr: string | null
  type: string
  adresse: string | null
}

export type Person = {
  rolle: string
  navn: string
  adresse: string | null
  andel?: string
}
