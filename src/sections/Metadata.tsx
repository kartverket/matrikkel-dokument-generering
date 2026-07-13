import { useTranslation } from "react-i18next"
import type { ByggRapport } from "../lib/schema/byggRapportSchema"

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
        <header className="bg-kv-blue-subtle p-4 font-semibold">
            <h1 className="text-2xl font-bold">{data.tittel}</h1>
            <div className="grid grid-cols-2 gap-1 py-2">
                <p>Matrikkelrapport {data.rapportType}</p>
                <p>Kommune: {data.kommune.nr} {data.kommune.navn}</p>
                <p>{formattedDate}</p>
                <p>{t(`${m}.koordinatsystem`)}: {data.koordinatsystem}</p>
            </div>
        </header>
    )
}