import { z } from "@hono/zod-openapi"

const enkeltminneArtKoder = [
  "1217", // Scene
  "1225", // Port-portal
  "1514", // Skanse
  "1519", // Krigsminne
  "1520", // Tårnkanon
  "1521", // Kanontårn/donjon
  "1526", // Kommandoplass
  "2012", // Tåkeklokke
  "2014", // Ruin (bygningsrest)
  "2415", // Steinbu
  "2421", // Bistasjon
  "2423", // Hovedstasjon
  "2424", // Utkikkspost
  "2505", // Tun
  "2512", // Áiti
  "2526", // Setervoll
  "2709", // Fjernet kirkebygg
  "2719", // Klostertuft
  "2720", // Moské
  "2721", // Tempel
  "3015", // Likeretterstasjon
  "9908", // Ruin (middelalder)
  "9914", // Trapp
  "9916", // Støpul
  "9991", // Annet tekn-ind. minne
  "10101", // Apotek
  "10102", // Atelier
  "10103", // Arbeiderbolig
  "10104", // Badstu-bad-badehus
  "10105", // Bakeri
  "10106", // Bank-børsbygning
  "10107", // Bensinstasjonsbygning
  "10108", // Bibliotekbygning
  "10109", // Bolig
  "10110", // Brannstasjon
  "10112", // Bygård
  "10113", // Driftsbygning
  "10114", // Drivhus
  "10115", // Dukkestue-lekestue
  "10116", // Eldhus-bryggerhus
  "10117", // Fengsel-celler
  "10118", // Borg-slott
  "10119", // Fjøs-stall
  "10120", // Forretningsbygg
  "10121", // Fyr
  "10123", // Garasje
  "10124", // Sengebu
  "10125", // Godsbygning
  "10126", // Hytte-fritid
  "10127", // Internat-forlegning
  "10128", // Kjeller-jordkjeller
  "10129", // Kapell
  "10132", // Kirke
  "10133", // Kloster
  "10134", // Kontor
  "10135", // Kraftstasjon
  "10136", // Kvernhus-mølle
  "10137", // Lagerbygning
  "10138", // Leskur
  "10139", // Lysthus-paviljong
  "10140", // Låve
  "10141", // Maskinhus
  "10142", // Museum-galleri
  "10143", // Naust - båthus
  "10145", // Produksjonslokale
  "10146", // Tinghus-rettslokale
  "10147", // Rorbu
  "10148", // Forsamlingslokale
  "10149", // Restaurant-kafe
  "10150", // Sel (seterbu)
  "10151", // Sjøhus
  "10152", // Skole
  "10153", // Smie
  "10155", // Bur-stabbur-loft
  "10156", // Stasjonsbygning
  "10157", // Stavkirke
  "10159", // Teknisk bygning
  "10160", // Tollbod
  "10162", // Tårn
  "10163", // Utedo
  "10164", // Uthus-skjul
  "10165", // Vaktstue
  "10166", // Verksted
  "10167", // Vognskjul
  "10168", // Annen bygningsart
  "10169", // Brønnhus
  "10172", // Gamme
  "10173", // Overnattingssted
  "10174", // Hospital-sykehjem
  "10175", // Hovedbygning
  "10176", // Kantine-kjøkken
  "10177", // Hytte-annet
  "10178", // Hønsehus-fuglehus
  "10181", // Kjone (tørkehus)
  "10183", // Vognhall-lokomotivstall
  "10184", // Melkebod-masstue
  "10186", // Politistasjon
  "10187", // Brakke
  "10188", // Røykstue
  "10189", // Rådhus
  "10190", // Selskapslokale
  "10192", // Teater-kino-konserthus
  "10193", // Treningslokale
  "10195", // Sidefløy
  "10196", // Hangar
  "10197", // Telefonkiosk
  "10198", // Sag
  "10199", // Boligblokk
  "10200", // Barnevernsinstitusjon
  "10201", // Barnehjem
  "10202", // Mødrehjem
  "10203", // Ungdomshjem
  "10204", // Bunker
  "10205", // Blokkhus
  "10206", // Observasjonspost
  "10207", // Kasematt
  "10208", // Administrativ bygning
  "10209", // Kjelehus
  "10210", // Inntakshus
  "10211", // Lukehus
  "10212", // Slusevokterbolig
  "10213", // Stålverk
  "10214", // Vokterbolig
  "10215", // Vinsjhus
  "10216", // Barnehagebygning
  "10217", // Fabrikkbygning
  "10218", // Batteri, del av festning
  "10220", // Magasin
  "10221", // Svømmehall
  "10222", // Idrettshall
  "10223", // Dekningsrom
  "10224", // Fort, del av festning
] as const

// ref: EnkeltminneArtKode.java / kodeverk-kulturminne.xml (Askeladden, RA)
// NB: I M22 er kodeverdi 2719 registrert for både «Klostertuft» og «Synagoge».
export const enkeltminneArtKodeSchema = z.enum(enkeltminneArtKoder).meta({
  id: "EnkeltminneArtKode",
  description: `Kode for artsbeskrivelse av enkeltminne (Askeladden, Riksantikvaren).

Koder:

\`\`\`
1217: Scene
1225: Port-portal
1514: Skanse
1519: Krigsminne
1520: Tårnkanon
1521: Kanontårn/donjon
1526: Kommandoplass
2012: Tåkeklokke
2014: Ruin (bygningsrest)
2415: Steinbu
2421: Bistasjon
2423: Hovedstasjon
2424: Utkikkspost
2505: Tun
2512: Áiti
2526: Setervoll
2709: Fjernet kirkebygg
2719: Klostertuft
2720: Moské
2721: Tempel
3015: Likeretterstasjon
9908: Ruin (middelalder)
9914: Trapp
9916: Støpul
9991: Annet tekn-ind. minne
10101: Apotek
10102: Atelier
10103: Arbeiderbolig
10104: Badstu-bad-badehus
10105: Bakeri
10106: Bank-børsbygning
10107: Bensinstasjonsbygning
10108: Bibliotekbygning
10109: Bolig
10110: Brannstasjon
10112: Bygård
10113: Driftsbygning
10114: Drivhus
10115: Dukkestue-lekestue
10116: Eldhus-bryggerhus
10117: Fengsel-celler
10118: Borg-slott
10119: Fjøs-stall
10120: Forretningsbygg
10121: Fyr
10123: Garasje
10124: Sengebu
10125: Godsbygning
10126: Hytte-fritid
10127: Internat-forlegning
10128: Kjeller-jordkjeller
10129: Kapell
10132: Kirke
10133: Kloster
10134: Kontor
10135: Kraftstasjon
10136: Kvernhus-mølle
10137: Lagerbygning
10138: Leskur
10139: Lysthus-paviljong
10140: Låve
10141: Maskinhus
10142: Museum-galleri
10143: Naust - båthus
10145: Produksjonslokale
10146: Tinghus-rettslokale
10147: Rorbu
10148: Forsamlingslokale
10149: Restaurant-kafe
10150: Sel (seterbu)
10151: Sjøhus
10152: Skole
10153: Smie
10155: Bur-stabbur-loft
10156: Stasjonsbygning
10157: Stavkirke
10159: Teknisk bygning
10160: Tollbod
10162: Tårn
10163: Utedo
10164: Uthus-skjul
10165: Vaktstue
10166: Verksted
10167: Vognskjul
10168: Annen bygningsart
10169: Brønnhus
10172: Gamme
10173: Overnattingssted
10174: Hospital-sykehjem
10175: Hovedbygning
10176: Kantine-kjøkken
10177: Hytte-annet
10178: Hønsehus-fuglehus
10181: Kjone (tørkehus)
10183: Vognhall-lokomotivstall
10184: Melkebod-masstue
10186: Politistasjon
10187: Brakke
10188: Røykstue
10189: Rådhus
10190: Selskapslokale
10192: Teater-kino-konserthus
10193: Treningslokale
10195: Sidefløy
10196: Hangar
10197: Telefonkiosk
10198: Sag
10199: Boligblokk
10200: Barnevernsinstitusjon
10201: Barnehjem
10202: Mødrehjem
10203: Ungdomshjem
10204: Bunker
10205: Blokkhus
10206: Observasjonspost
10207: Kasematt
10208: Administrativ bygning
10209: Kjelehus
10210: Inntakshus
10211: Lukehus
10212: Slusevokterbolig
10213: Stålverk
10214: Vokterbolig
10215: Vinsjhus
10216: Barnehagebygning
10217: Fabrikkbygning
10218: Batteri, del av festning
10220: Magasin
10221: Svømmehall
10222: Idrettshall
10223: Dekningsrom
10224: Fort, del av festning
\`\`\``,
  example: "10175",
})

export type EnkeltminneArtKode = z.infer<typeof enkeltminneArtKodeSchema>
