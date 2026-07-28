import { valgfriString } from "../../../core/utils/zodUtils"

export const sefrakSchema = valgfriString
  .meta({
    example: "0301-0103-058",
    description:
      "Sefrak-ID er bygningens identifikasjonsnummer i SEFRAK-registeret, et kulturhistorisk register over eldre bygninger. SEFRAK står for «Sekretariatet for registrering av faste kulturminne i Norge». \n" +
      "Tallene betyr: KommuneNummer - Registreringskrets - Husløpenummer, med ledende nuller \n" +
      "\n" +
      "Eksempelvis for Sefrak-ID 0301-0103-058 så er: \n" +
      "0301 – kommunenummeret for Oslo \n" +
      "0103 – registreringskretsen, altså Riksantikvarens geografiske inndeling av kommunen, historisk ofte basert på eldre kirke- eller sognekretser \n" +
      "058 – bygningens husløpenummer innenfor registreringskrets 103",
  })
  .meta({
    title: "SEFRAK-minner",
    description:
      "Sefrak-ID-ene til SEFRAK-minnene som er knyttet til bygningsendringen. SEFRAK-knytningen går vanligvis til bygget (grunnregistreringen), unntaksvis til tilbygg.",
  })
