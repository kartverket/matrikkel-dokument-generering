import { useTranslation } from "react-i18next"
import type { Bygning } from "../lib/schema/byggRapportSchema"
import { isFerdigstilt } from "../lib/utils/isFerdigstilt"
import { formatDateTime } from "../lib/utils/format"
import { Label, Paragraph } from "@kv-designsystem/react"
import { Card, Divider, Heading } from "@digdir/designsystemet-react"

interface Props {
    bygning: Bygning
}

export default function Byggoversikt({ bygning }: Props) {
    const { t } = useTranslation()

    const gjeldende = [...bygning.endringer]
        .filter(isFerdigstilt)
        .sort((a, b) => b.lopenr - a.lopenr)[0]

    if (!gjeldende) return null

    const etasjer = gjeldende.etasjeplan.map((e) => `${e.etasjeplan} (${e.etasje})`).join(", ")

    const oversikt = {
        bygningsstatus: gjeldende.bygningsstatus.navn,
        bygningstype: `${bygning.bygningstype.kode} ${bygning.bygningstype.navn}`,
        antallBruksenheter: gjeldende.bruksenheter.length,
        antallBoenheter: gjeldende.antallBoenheter,
        naeringsgruppe: bygning.naeringsgruppe,
        koordinater: `${gjeldende.koordinat.nord} N / ${gjeldende.koordinat.ost} Ø`,
        etasjer,
        bygningsnr: bygning.bygningsnr,
    }

    return (
        <section className="p-6">
            <div className="flex justify-between items-center gap-2">
                <div className="flex gap-4 items-center">
                    <Label className="text-kv-blue text-sm">03</Label>
                    <Heading level={2}>{t(`rapport.BYG0011.byggoversikt.title`)}</Heading>
                </div>
                <Paragraph data-size="xs" className="text-gray-400">
                    Nøkkelinformasjon per bygg
                </Paragraph>
            </div>

            <Divider className="border border-kv-blue" />

            <div className="rounded-xl p-8 border border-kv-blue-subtle space-y-8 mt-8">

                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-4">
                            <Heading level={3}>Bygg {gjeldende.lopenr}</Heading>
                            <Paragraph className="text-gray-400" data-size="sm">{bygning.bygningstype.kode} {bygning.bygningstype.navn}</Paragraph>
                        </div>
                        <div className="text-gray-400" data-size="sm">
                            Bygningsnr. {bygning.bygningsnr} - Løpenr. {gjeldende.lopenr}
                        </div>
                    </div>

                    <div>
                        <Paragraph data-size="sm" className="text-kv-blue font-semibold">{gjeldende.bygningsstatus.navn}</Paragraph>
                        {gjeldende.datoer.ferdigattest && (
                            <Paragraph className="text-gray-400" data-size="sm">Ferdigattest: {formatDateTime(gjeldende.datoer.ferdigattest, "nb")}</Paragraph>
                        )}
                    </div>
                </div>

                <Divider />

                <ul className="grid grid-cols-3 gap-4">
                    <Card>
                        <Paragraph className="text-3xl">{gjeldende.bruksareal.totalt} m²</Paragraph>
                        <Label>{t(`rapport.BYG0011.byggoversikt.bra`)}</Label>
                        <Paragraph data-size="sm">Bruksareal, per nå</Paragraph>
                    </Card>
                    <Card>
                        <Paragraph className="text-3xl">{gjeldende.bruttoareal.totalt} m²</Paragraph>
                        <Label>{t(`rapport.BYG0011.byggoversikt.bta`)}</Label>
                        <Paragraph data-size="sm">Bruttoareal</Paragraph>
                    </Card>
                    <Card>
                        <Paragraph className="text-3xl">{gjeldende.bebygdAreal} m²</Paragraph>
                        <Label>{t(`rapport.BYG0011.byggoversikt.bya`)}</Label>
                        <Paragraph data-size="sm">Bebygd areal</Paragraph>
                    </Card>
                </ul>

                <ul className="grid grid-cols-2 gap-4">
                    {(Object.entries(oversikt) as Array<[keyof typeof oversikt, string | number]>).map(([key, value]) => (
                        <li key={key}>
                            <Label>{t(`rapport.BYG0011.byggoversikt.${key}`)}</Label>
                            <Paragraph data-size="sm">{value}</Paragraph>
                        </li>
                    ))}
                </ul>


            </div>
        </section>
    )
}
