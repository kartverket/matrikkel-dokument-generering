import { z } from "@hono/zod-openapi"
import type { TFunction } from "i18next"
import type { RapportLocale } from "../../../core/locale.schema"

type BygningstypeRad = readonly [kode: string, nb: string, nn?: string]

const bygningstyper = [
  [" ", "Ikke valgt", "Ikkje valt"],
  ["111", "Enebolig", "Einebustad"],
  [
    "112",
    "Enebolig med hybelleilighet, sokkelleilighet o.l.",
    "Einebustad med hybelleilegheit, sokkelleilegheit o.l.",
  ],
  ["113", "Våningshus"],
  ["121", "Tomannsbolig, vertikaldelt", "Del av tomannsbustad, vertikaldelt"],
  ["122", "Tomannsbolig, horisontaldelt", "Tomannsbustad, horisontaldelt"],
  [
    "123",
    "Våningshus, tomannsbolig, vertikaldelt",
    "Del av våningshus, tomannsbustad, vertikaldelt",
  ],
  [
    "124",
    "Våningshus, tomannsbolig, horisontaldelt",
    "Våningshus, tomannsbustad, horisontaldelt",
  ],
  ["131", "Rekkehus", "Rekkjehus"],
  ["133", "Kjedehus inkl. atriumhus"],
  ["135", "Terrassehus"],
  [
    "136",
    "Andre småhus med 3 boliger eller flere",
    "Andre småhus med 3 bustader eller fleire",
  ],
  [
    "141",
    "Store frittliggende boligbygg på 2 etasjer",
    "Store frittliggjande bustadbygg på 2 etasjar",
  ],
  [
    "142",
    "Store frittliggende boligbygg på 3 og 4 etasjer",
    "Store frittliggjande bustadbygg på 3 og 4 etasjar",
  ],
  [
    "143",
    "Store frittliggende boligbygg på 5 etasjer eller over",
    "Store frittliggjande bustadbygg på 5 etasjar eller over",
  ],
  [
    "144",
    "Store sammenbygde boligbygg på 2 etasjer",
    "Stort samanbygd bustadbygg på 2 etasjar",
  ],
  [
    "145",
    "Store sammenbygde boligbygg på 3 og 4 etasjer",
    "Stort samanbygd bustadbygg på 3 og 4 etasjar",
  ],
  [
    "146",
    "Store sammenbygde boligbygg på 5 etasjer og over",
    "Stort samanbygd bustadbygg på 5 etasjar og over",
  ],
  ["151", "Bo- og servicesenter", "Bu- og servicesenter"],
  ["152", "Studenthjem/studentboliger", "Studentheim/studentbustader"],
  ["159", "Annen bygning for bofellesskap", "Annan bygning for bufellesskap"],
  [
    "161",
    "Fritidsbygning (hytter, sommerhus o.l.)",
    "Fritidsbygning (hytter, sommarhus o.l.)",
  ],
  [
    "162",
    "Helårsbolig benyttet som fritidsbolig",
    "Heilårsbustad utanom våningshus som blir nytta som fritidsbustad",
  ],
  [
    "163",
    "Våningshus benyttet som fritidsbolig",
    "Våningshus som blir nytta som fritidsbustad",
  ],
  ["171", "Seterhus, sel, rorbu o.l."],
  ["172", "Skogs- og utmarkskoie, gamme"],
  [
    "181",
    "Garasje, uthus, anneks knyttet til bolig",
    "Garasje, uthus, anneks knytte til bustad",
  ],
  [
    "182",
    "Garasje, uthus, anneks knyttet til fritidsbolig",
    "Garasje, uthus, anneks knytte til fritidsbustad",
  ],
  ["183", "Naust, båthus, sjøbu"],
  ["193", "Boligbrakker", "Bustadbrakker"],
  [
    "199",
    "Annen boligbygning (f.eks. sekundærbolig reindrift)",
    "Annan bustadbygning (f.eks. sekundærbustad reindrift)",
  ],
  ["211", "Fabrikkbygning"],
  ["212", "Verkstedbygning", "Verkstadbygning"],
  ["214", "Bygning for renseanlegg", "Bygning for reinseanlegg"],
  [
    "216",
    "Bygning for vannforsyning, bl.a. pumpestasjon",
    "Bygning for vassforsyning, bl.a. pumpestasjon",
  ],
  ["219", "Annen industribygning", "Annan industribygning"],
  ["221", "Kraftstasjon (>15 000 kVA)"],
  ["223", "Transformatorstasjon (>10 000 kVA)"],
  ["229", "Annen energiforsyningsbygning", "Annan energiforsyningsbygning"],
  ["231", "Lagerhall"],
  ["232", "Kjøle- og fryselager"],
  ["233", "Silobygning"],
  ["239", "Annen lagerbygning", "Annan lagerbygning"],
  [
    "241",
    "Hus for dyr, fôrlager, strølager, frukt- og grønnsakslager, landbrukssilo, høy-/korntørke",
    "Hus for dyr, fôrlager, strølager, frukt- og grønsakslager, landbrukssilo, høy-/korntørke",
  ],
  ["243", "Veksthus"],
  ["244", "Driftsbygning for fiske og fangst, inkl. oppdrettsanlegg"],
  ["245", "Naust/redskapshus for fiske", "Naust/reiskapshus for fiske"],
  ["248", "Annen fiskeri- og fangstbygning", "Annan fiskeri- og fangstbygning"],
  ["249", "Annen landbruksbygning", "Annan landbruksbygning"],
  ["311", "Kontor- og administrasjonsbygning, rådhus"],
  ["312", "Bankbygning, posthus"],
  ["313", "Mediebygning"],
  ["319", "Annen kontorbygning", "Annan kontorbygning"],
  ["321", "Kjøpesenter, varehus"],
  ["322", "Butikkbygning"],
  ["323", "Bensinstasjon"],
  ["329", "Annen forretningsbygning", "Annan forretningsbygning"],
  ["330", "Messe- og kongressbygning"],
  ["411", "Ekspedisjonsbygning, flyterminal, kontrolltårn"],
  ["412", "Jernbane- og T-banestasjon"],
  ["415", "Godsterminal"],
  ["416", "Postterminal"],
  [
    "419",
    "Annen ekspedisjons- og terminalbygning",
    "Annan ekspedisjons- og terminalbygning",
  ],
  ["429", "Telekommunikasjonsbygning"],
  ["431", "Parkeringshus"],
  ["439", "Annen garasje- hangarbygning", "Annan garasje- hangarbygning"],
  ["441", "Trafikktilsynsbygning"],
  [
    "449",
    "Annen veg- og trafikktilsynsbygning",
    "Annan veg- og trafikktilsynsbygning",
  ],
  ["511", "Hotellbygning"],
  ["512", "Motellbygning"],
  ["519", "Annen hotellbygning", "Annan hotellbygning"],
  ["521", "Hospits, pensjonat"],
  [
    "522",
    "Vandrerhjem, feriehjem/-koloni, turisthytte",
    "Vandrarheim, ferieheim/-koloni, turisthytte",
  ],
  ["523", "Appartement"],
  ["524", "Campinghytte/utleiehytte"],
  ["529", "Annen bygning for overnatting", "Annan bygning for overnatting"],
  ["531", "Restaurantbygning, kafébygning"],
  ["532", "Sentralkjøkken, kantinebygning", "Sentralkjøken, kantinebygning"],
  ["533", "Gatekjøkken, kioskbygning", "Gatekjøken, kioskbygning"],
  ["539", "Annen restaurantbygning", "Annan restaurantbygning"],
  ["611", "Lekepark"],
  ["612", "Barnehage"],
  ["613", "Barneskole"],
  ["614", "Ungdomsskole"],
  ["615", "Kombinert barne- og ungdomsskole"],
  ["616", "Videregående skole", "Vidaregåande skole"],
  ["619", "Annen skolebygning", "Annan skolebygning"],
  [
    "621",
    "Universitets- og høgskolebygning med integrerte funksjoner, auditorium, lesesal o.a.",
    "Universitets- og høgskolebygning med integrerte funksjonar, auditorium, lesesal o.a.",
  ],
  ["623", "Laboratoriebygning"],
  [
    "629",
    "Annen universitets-, høgskole- og forskningsbygning",
    "Annan universitets-,høgskole- og forskningsbygning",
  ],
  ["641", "Museum, kunstgalleri"],
  ["642", "Bibliotek, mediatek"],
  ["643", "Zoologisk og botanisk hage"],
  [
    "649",
    "Annen museums- og bibliotekbygning",
    "Annan museums- og bibliotekbygning",
  ],
  ["651", "Idrettshall"],
  ["652", "Ishall"],
  ["653", "Svømmehall", "Symjehall"],
  ["654", "Tribune og idrettsgarderobe"],
  ["655", "Helsestudio"],
  ["659", "Annen idrettsbygning", "Annan idrettsbygning"],
  ["661", "Kinobygning, teaterbygning, opera/konserthus"],
  ["662", "Samfunnshus, grendehus"],
  ["663", "Diskotek"],
  ["669", "Annet kulturhus", "Anna kulturhus"],
  ["671", "Kirke, kapell", "Kyrkje, kapell"],
  ["672", "Bedehus, menighetshus", "Bedehus, kyrkjelydshus"],
  ["673", "Krematorium, gravkapell, bårehus"],
  ["674", "Synagoge, moské"],
  ["675", "Kloster"],
  [
    "679",
    "Annen bygning for religiøse aktiviteter",
    "Annan bygning for religiøse aktivitetar",
  ],
  ["719", "Sykehus", "Sjukehus"],
  ["721", "Sykehjem", "Sjukeheim"],
  [
    "722",
    "Bo- og behandlingssenter, aldershjem",
    "Bu- og behandlingssenter, aldersheim",
  ],
  ["723", "Rehabiliteringsinstitusjon, kurbad"],
  ["729", "Annet sykehjem", "Annan sjukeheim"],
  ["731", "Klinikk, legekontor/-senter/-vakt"],
  ["732", "Helse- og sosialsenter, helsestasjon"],
  ["739", "Annen primærhelsebygning", "Annan primærhelsebygning"],
  ["819", "Fengselsbygning"],
  ["821", "Politistasjon"],
  ["822", "Brannstasjon, ambulansestasjon"],
  ["823", "Fyrstasjon, losstasjon"],
  [
    "824",
    "Stasjon for radarovervåkning av fly- og/eller skipstrafikk",
    "Stasjon for radarovervaking av fly- og/eller skipstrafikk",
  ],
  ["825", "Tilfluktsrom/bunker"],
  ["829", "Annen beredskapsbygning", "Annan beredskapsbygning"],
  ["830", "Monument"],
  ["840", "Offentlig toalett", "Offentleg toalett"],
  ["999", "Ukjent bygningstype", "Ukjend bygningstype"],
] as const satisfies readonly BygningstypeRad[]

export type Bygningstypekode = (typeof bygningstyper)[number][0]

export const bygningstypekoder = bygningstyper.map(([kode]) => kode) as [
  Bygningstypekode,
  ...Bygningstypekode[],
]

export function getBygningstypeResource(
  locale: RapportLocale,
): Record<Bygningstypekode, string> {
  return Object.fromEntries(
    bygningstyper.map((rad) => {
      const [kode, nb, nn = nb] = rad as BygningstypeRad
      return [kode, locale === "nn" ? nn : nb]
    }),
  ) as Record<Bygningstypekode, string>
}

function erBygningstypekode(kode: string): kode is Bygningstypekode {
  return new Set<string>(bygningstypekoder).has(kode)
}

export function getBygningstype(kode: string, t: TFunction): string {
  const gyldigKode = erBygningstypekode(kode) ? kode : "999"
  return t(`bygningstyper.${gyldigKode}`)
}

export const bygningstypeSchema = z
  .object({
    kode: z.enum(bygningstypekoder).meta({ example: "111" }),
  })
  .meta({ id: "ByggBygningstype" })

export type Bygningstype = z.infer<typeof bygningstypeSchema>
