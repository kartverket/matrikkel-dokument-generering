import { z } from "@hono/zod-openapi"

// ref: BygningstypeKodeId.java
export const bygningsTypeKodeSchema = z
  .enum([
    " ", // Ikke valgt (Sånn det blir definert i M22 i dag...)
    "111", // Enebolig
    "112", // Enebolig med hybelleilighet, sokkelleilighet o.l.
    "113", // Våningshus
    "121", // Tomannsbolig, vertikaldelt
    "122", // Tomannsbolig, horisontaldelt
    "123", // Våningshus, tomannsbolig, vertikaldelt
    "124", // Våningshus, tomannsbolig, horisontaldelt
    "131", // Rekkehus
    "133", // Kjedehus inkl. atriumhus
    "135", // Terrassehus
    "136", // Andre småhus med 3 boliger eller flere
    "141", // Store frittliggende boligbygg på 2 etasjer
    "142", // Store frittliggende boligbygg på 3 og 4 etasjer
    "143", // Store frittliggende boligbygg på 5 etasjer eller over
    "144", // Store sammenbygde boligbygg på 2 etasjer
    "145", // Store sammenbygde boligbygg på 3 og 4 etasjer
    "146", // Store sammenbygde boligbygg på 5 etasjer og over
    "151", // Bo- og servicesenter
    "152", // Studenthjem/studentboliger
    "159", // Annen bygning for bofellesskap
    "161", // Fritidsbygning
    "162", // Helårsbolig benyttet som fritidsbolig
    "163", // Våningshus benyttet som fritidsbolig
    "171", // Seterhus, sel, rorbu o.l.
    "172", // Skogs- og utmarkskoie, gamme
    "181", // Garasje, uthus, anneks knyttet til bolig
    "182", // Garasje, uthus, anneks knyttet til fritidsbolig
    "183", // Naust, båthus, sjøbu
    "193", // Boligbrakker
    "199", // Annen boligbygning
    "211", // Fabrikkbygning
    "212", // Verkstedbygning
    "214", // Bygning for renseanlegg
    "216", // Bygning for vannforsyning
    "219", // Annen industribygning
    "221", // Kraftstasjon
    "223", // Transformatorstasjon
    "229", // Annen energiforsyningsbygning
    "231", // Lagerhall
    "232", // Kjøle- og fryselager
    "233", // Silobygning
    "239", // Annen lagerbygning
    "241", // Hus for dyr, lagerbygning mv.
    "243", // Veksthus
    "244", // Driftsbygning for fiske og fangst
    "245", // Naust/redskapshus for fiske
    "248", // Annen fiskeri- og fangstbygning
    "249", // Annen landbruksbygning
    "311", // Kontor- og administrasjonsbygning, rådhus
    "312", // Bankbygning, posthus
    "313", // Mediebygning
    "319", // Annen kontorbygning
    "321", // Kjøpesenter, varehus
    "322", // Butikkbygning
    "323", // Bensinstasjon
    "329", // Annen forretningsbygning
    "330", // Messe- og kongressbygning
    "411", // Ekspedisjonsbygning, flyterminal, kontrolltårn
    "412", // Jernbane- og T-banestasjon
    "415", // Godsterminal
    "416", // Postterminal
    "419", // Annen ekspedisjons- og terminalbygning
    "429", // Telekommunikasjonsbygning
    "431", // Parkeringshus
    "439", // Annen garasje- og hangarbygning
    "441", // Trafikktilsynsbygning
    "449", // Annen veg- og trafikktilsynsbygning
    "511", // Hotellbygning
    "512", // Motellbygning
    "519", // Annen hotellbygning
    "521", // Hospits, pensjonat
    "522", // Vandrerhjem, feriehjem/-koloni, turisthytte
    "523", // Appartement
    "524", // Campinghytte/utleiehytte
    "529", // Annen bygning for overnatting
    "531", // Restaurantbygning, kafébygning
    "532", // Sentralkjøkken, kantinebygning
    "533", // Gatekjøkken, kioskbygning
    "539", // Annen restaurantbygning
    "611", // Lekepark
    "612", // Barnehage
    "613", // Barneskole
    "614", // Ungdomsskole
    "615", // Kombinert barne- og ungdomsskole
    "616", // Videregående skole
    "619", // Annen skolebygning
    "621", // Universitets- og høgskolebygning
    "623", // Laboratoriebygning
    "629", // Annen universitets-, høgskole- og forskningsbygning
    "641", // Museum, kunstgalleri
    "642", // Bibliotek, mediatek
    "643", // Zoologisk og botanisk hage
    "649", // Annen museums- og bibliotekbygning
    "651", // Idrettshall
    "652", // Ishall
    "653", // Svømmehall
    "654", // Tribune og idrettsgarderobe
    "655", // Helsestudio
    "659", // Annen idrettsbygning
    "661", // Kinobygning, teaterbygning, opera/konserthus
    "662", // Samfunnshus, grendehus
    "663", // Diskotek
    "669", // Annet kulturhus
    "671", // Kirke, kapell
    "672", // Bedehus, menighetshus
    "673", // Krematorium, gravkapell, bårehus
    "674", // Synagoge, moské
    "675", // Kloster
    "679", // Annen bygning for religiøse aktiviteter
    "719", // Sykehus
    "721", // Sykehjem
    "722", // Bo- og behandlingssenter, aldershjem
    "723", // Rehabiliteringsinstitusjon, kurbad
    "729", // Annet sykehjem
    "731", // Klinikk, legekontor/-senter/-vakt
    "732", // Helse- og sosialsenter, helsestasjon
    "739", // Annen primærhelsebygning
    "819", // Fengselsbygning
    "821", // Politistasjon
    "822", // Brannstasjon, ambulansestasjon
    "823", // Fyrstasjon, losstasjon
    "824", // Stasjon for radarovervåkning
    "825", // Tilfluktsrom/bunker
    "829", // Annen beredskapsbygning
    "830", // Monument
    "840", // Offentlig toalett
    "999", // Ukjent bygningstype
  ])
  .meta({
    id: "BygningsTypeKode",
    description:
      "Angir hvilken type bygning det er. Koder:\n" +
      "' ': Ikke valgt\n" +
      "111: Enebolig\n" +
      "112: Enebolig med hybelleilighet, sokkelleilighet o.l.\n" +
      "113: Våningshus\n" +
      "121: Tomannsbolig, vertikaldelt\n" +
      "122: Tomannsbolig, horisontaldelt\n" +
      "123: Våningshus, tomannsbolig, vertikaldelt\n" +
      "124: Våningshus, tomannsbolig, horisontaldelt\n" +
      "131: Rekkehus\n" +
      "133: Kjedehus inkl. atriumhus\n" +
      "135: Terrassehus\n" +
      "136: Andre småhus med 3 boliger eller flere\n" +
      "141: Store frittliggende boligbygg på 2 etasjer\n" +
      "142: Store frittliggende boligbygg på 3 og 4 etasjer\n" +
      "143: Store frittliggende boligbygg på 5 etasjer eller over\n" +
      "144: Store sammenbygde boligbygg på 2 etasjer\n" +
      "145: Store sammenbygde boligbygg på 3 og 4 etasjer\n" +
      "146: Store sammenbygde boligbygg på 5 etasjer og over\n" +
      "151: Bo- og servicesenter\n" +
      "152: Studenthjem/studentboliger\n" +
      "159: Annen bygning for bofellesskap\n" +
      "161: Fritidsbygning (hytter, sommerhus o.l.)\n" +
      "162: Helårsbolig benyttet som fritidsbolig\n" +
      "163: Våningshus benyttet som fritidsbolig\n" +
      "171: Seterhus, sel, rorbu o.l.\n" +
      "172: Skogs- og utmarkskoie, gamme\n" +
      "181: Garasje, uthus, anneks knyttet til bolig\n" +
      "182: Garasje, uthus, anneks knyttet til fritidsbolig\n" +
      "183: Naust, båthus, sjøbu\n" +
      "193: Boligbrakker\n" +
      "199: Annen boligbygning (f.eks. sekundærbolig reindrift)\n" +
      "211: Fabrikkbygning\n" +
      "212: Verkstedbygning\n" +
      "214: Bygning for renseanlegg\n" +
      "216: Bygning for vannforsyning, bl.a. pumpestasjon\n" +
      "219: Annen industribygning\n" +
      "221: Kraftstasjon (>15 000 kVA)\n" +
      "223: Transformatorstasjon (>10 000 kVA)\n" +
      "229: Annen energiforsyningsbygning\n" +
      "231: Lagerhall\n" +
      "232: Kjøle- og fryselager\n" +
      "233: Silobygning\n" +
      "239: Annen lagerbygning\n" +
      "241: Hus for dyr, fôrlager, strølager, frukt- og grønnsakslager, landbrukssilo, høy-/korntørke\n" +
      "243: Veksthus\n" +
      "244: Driftsbygning for fiske og fangst, inkl. oppdrettsanlegg\n" +
      "245: Naust/redskapshus for fiske\n" +
      "248: Annen fiskeri- og fangstbygning\n" +
      "249: Annen landbruksbygning\n" +
      "311: Kontor- og administrasjonsbygning, rådhus\n" +
      "312: Bankbygning, posthus\n" +
      "313: Mediebygning\n" +
      "319: Annen kontorbygning\n" +
      "321: Kjøpesenter, varehus\n" +
      "322: Butikkbygning\n" +
      "323: Bensinstasjon\n" +
      "329: Annen forretningsbygning\n" +
      "330: Messe- og kongressbygning\n" +
      "411: Ekspedisjonsbygning, flyterminal, kontrolltårn\n" +
      "412: Jernbane- og T-banestasjon\n" +
      "415: Godsterminal\n" +
      "416: Postterminal\n" +
      "419: Annen ekspedisjons- og terminalbygning\n" +
      "429: Telekommunikasjonsbygning\n" +
      "431: Parkeringshus\n" +
      "439: Annen garasje- hangarbygning\n" +
      "441: Trafikktilsynsbygning\n" +
      "449: Annen veg- og trafikktilsynsbygning\n" +
      "511: Hotellbygning\n" +
      "512: Motellbygning\n" +
      "519: Annen hotellbygning\n" +
      "521: Hospits, pensjonat\n" +
      "522: Vandrerhjem, feriehjem/-koloni, turisthytte\n" +
      "523: Appartement\n" +
      "524: Campinghytte/utleiehytte\n" +
      "529: Annen bygning for overnatting\n" +
      "531: Restaurantbygning, kafébygning\n" +
      "532: Sentralkjøkken, kantinebygning\n" +
      "533: Gatekjøkken, kioskbygning\n" +
      "539: Annen restaurantbygning\n" +
      "611: Lekepark\n" +
      "612: Barnehage\n" +
      "613: Barneskole\n" +
      "614: Ungdomsskole\n" +
      "615: Kombinert barne- og ungdomsskole\n" +
      "616: Videregående skole\n" +
      "619: Annen skolebygning\n" +
      "621: Universitets- og høgskolebygning med integrerte funksjoner, auditorium, lesesal o.a.\n" +
      "623: Laboratoriebygning\n" +
      "629: Annen universitets-, høgskole- og forskningsbygning\n" +
      "641: Museum, kunstgalleri\n" +
      "642: Bibliotek, mediatek\n" +
      "643: Zoologisk og botanisk hage\n" +
      "649: Annen museums- og bibliotekbygning\n" +
      "651: Idrettshall\n" +
      "652: Ishall\n" +
      "653: Svømmehall\n" +
      "654: Tribune og idrettsgarderobe\n" +
      "655: Helsestudio\n" +
      "659: Annen idrettsbygning\n" +
      "661: Kinobygning, teaterbygning, opera/konserthus\n" +
      "662: Samfunnshus, grendehus\n" +
      "663: Diskotek\n" +
      "669: Annet kulturhus\n" +
      "671: Kirke, kapell\n" +
      "672: Bedehus, menighetshus\n" +
      "673: Krematorium, gravkapell, bårehus\n" +
      "674: Synagoge, moské\n" +
      "675: Kloster\n" +
      "679: Annen bygning for religiøse aktiviteter\n" +
      "719: Sykehus\n" +
      "721: Sykehjem\n" +
      "722: Bo- og behandlingssenter, aldershjem\n" +
      "723: Rehabiliteringsinstitusjon, kurbad\n" +
      "729: Annet sykehjem\n" +
      "731: Klinikk, legekontor/-senter/-vakt\n" +
      "732: Helse- og sosialsenter, helsestasjon\n" +
      "739: Annen primærhelsebygning\n" +
      "819: Fengselsbygning\n" +
      "821: Politistasjon\n" +
      "822: Brannstasjon, ambulansestasjon\n" +
      "823: Fyrstasjon, losstasjon\n" +
      "824: Stasjon for radarovervåkning av fly- og/eller skipstrafikk\n" +
      "825: Tilfluktsrom/bunker\n" +
      "829: Annen beredskapsbygning\n" +
      "830: Monument\n" +
      "840: Offentlig toalett\n" +
      "999: Ukjent bygningstype",
    example: "111",
  })

export type Bygningstypekode = z.infer<typeof bygningsTypeKodeSchema>
