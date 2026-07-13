import { useTranslation } from "react-i18next"
import type { ByggRapport } from "../lib/schema/byggRapportSchema"
import { Heading, Paragraph } from "@kv-designsystem/react"

const m = "rapport.BYG0011.metadata"

interface Props {
    data: ByggRapport
}

export function Metadata({ data }: Props) {
    const { t } = useTranslation()

    const formattedDate = new Intl.DateTimeFormat(data.locale, {
        dateStyle: "long",
        timeStyle: "short",
    }).format(new Date(data.generertTidspunkt))

    return (
        <header className="bg-kv-blue-subtle p-4">
            <Heading level={1}>{data.tittel}</Heading>
            <div className="flex justify-between max-w-6xl pt-2">
                <div>
                    <Paragraph>Matrikkelrapport {data.rapportType}</Paragraph>
                    <Paragraph>Kommune: {data.kommune.nr} {data.kommune.navn}</Paragraph>
                </div>
                <div>
                    <Paragraph>{formattedDate}</Paragraph>
                    <Paragraph>{t(`${m}.koordinatsystem`)}: {data.koordinatsystem}</Paragraph>
                </div>
            </div>
        </header>
    )
}