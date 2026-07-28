import type { MassivBruksenhet } from "../lib/schema/reports/bygg/byg0001/bygningMassiv.schema.ts"
import type { Byg0001Rapport } from "../lib/schema/reports/bygg/byg0001/bygningMassivRapport.schema.ts"
import type { TiltaksHaver } from "../lib/schema/reports/bygg/byg0011/byggEndring.schema.ts"

function isoDatetime(date: string) {
  return `${date}T00:00:00Z`
}

function bruksenhet({
  id,
  antallRom,
  bruksAreal,
}: {
  id: string
  antallRom: number
  bruksAreal: number
}): MassivBruksenhet {
  return {
    bruksenhetsNr: id,
    matrikkelNr: "3201/208/12/0",
    adresse: `Belsetveien 114 ${id}, 1348 Rykkinn`,
    bruksenhetsTypeKode: "B",
    antallRom,
    antallBad: 1,
    antallWC: 1,
    bruksAreal,
    kjokkenTilgangKode: "1",
  }
}

const tiltakshaver: TiltaksHaver = {
  kontaktPersonKode: "T",
  bruksenhetsNr: "H0101",
  identifikasjonsNr: "01019012345",
  navn: "Fredrik Nordmann",
  adresse: "Storgata 1, 0155 Oslo",
}

const mockBygningMassivRapport: Byg0001Rapport = {
  rapportKode: "BYG0001",
  locale: "nb",
  metadata: {
    kommune: { kommuneNr: "3201", kommuneNavn: "Bærum" },
    koordinatSystemKode: "22",
    generertTidspunkt: "2026-07-17T10:00:00Z",
  },
  bygninger: [
    {
      bygningsnr: "18 520 621",
      bygningsStatusKode: "TB",
      bygningsTypeKode: "111",
      naringsgruppeKode: "X",
      nord: 6642100,
      ost: 597400,
      datoer: {
        rammetillatelse: isoDatetime("1997-03-15"),
        igangsettingstillatelse: isoDatetime("1997-05-03"),
        tattIBruk: isoDatetime("1998-06-18"),
      },
      antallBoenheter: 2,
      bruksareal: {
        boligAreal: 102,
        annetAreal: 35,
        totaltAreal: 137,
      },
      bruksenheter: [
        bruksenhet({ id: "H0101", antallRom: 3, bruksAreal: 74 }),
        bruksenhet({ id: "H0102", antallRom: 2, bruksAreal: 28 }),
      ],
      bygningsendringer: [
        {
          lopeNr: 1,
          endringsKode: "T",
          bygningsStatusKode: "FA",
          naringsgruppeKode: "X",
          datoer: {
            rammetillatelse: isoDatetime("2019-02-12"),
            igangsettingstillatelse: isoDatetime("2019-05-06"),
            midlertidigBrukstillatelse: isoDatetime("2020-01-22"),
            ferdigattest: isoDatetime("2020-08-20"),
          },
          antallBoenheter: 1,
          bruksareal: {
            boligAreal: 40,
            annetAreal: 0,
            totaltAreal: 40,
          },
          bruksenheter: [
            bruksenhet({ id: "H0103", antallRom: 2, bruksAreal: 40 }),
          ],
          kontaktpersoner: [tiltakshaver],
        },
      ],
      aktuelleEiere: [
        {
          bruksenhetsNr: "H0101",
          eierforholdKode: "H",
          identifikasjonsNr: "12051978",
          erAvdoed: false,
          navn: "Ola Nordmann",
          adresse: "Belsetveien 114, 1348 Rykkinn",
          andel: "1/2",
        },
      ],
      tiltakshavere: [tiltakshaver],
      enkeltminner: [
        {
          enkeltminneNr: "86155-1",
          enkeltminneArtKode: "Bolig",
          kulturminneKategoriKode: "B",
          vernetypeKode: "AUT",
        },
      ],
    },
  ],
}

export default mockBygningMassivRapport
