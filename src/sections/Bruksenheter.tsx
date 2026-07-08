import { DataTable } from "../components/DataTable.tsx";
import type { Column } from "../types.ts";
import type { Bruksenhet } from "../lib/schema/byggRapportSchema.ts";
import { useTranslation } from "react-i18next";

interface BruksenhetProps {
    bruksenheter: Bruksenhet[]
}

export default function Bruksenheter({ bruksenheter }: BruksenhetProps) {
    const { t } = useTranslation()
    
    const columns: Column<Bruksenhet>[] = [
        { header: t("rapport.BYG0011.bruksenheter.bruksenhetsnr"), render: (b) => b.bruksenhetsnr ?? "–" },
        { header: t("rapport.BYG0011.bruksenheter.type"), render: (b) => b.type },
        { header: t("rapport.BYG0011.bruksenheter.matrikkelenhet"), render: (b) => `${b.matrikkelenhet.gnr}/${b.matrikkelenhet.bnr}` },
        { header: t("rapport.BYG0011.bruksenheter.adresse"), render: (b) => b.adresse ?? "–" },
        { header: t("rapport.BYG0011.bruksenheter.bra"), render: (b) => `${b.bruksareal} m²` },
        { header: t("rapport.BYG0011.bruksenheter.rom"), render: (b) => String(b.antallRom) },
        { header: t("rapport.BYG0011.bruksenheter.kjokkentilgang"), render: (b) => Boolean(b.kjokkentilgang) ? "Ja" : "Nei" },
        { header: t("rapport.BYG0011.bruksenheter.bad"), render: (b) => String(b.antallBad) },
        { header: t("rapport.BYG0011.bruksenheter.wc"), render: (b) => String(b.antallWc) },
    ]

    return (
        <>
            <h2>{t("rapport.BYG0011.bruksenheter.title")}</h2>
            <DataTable
                columns={columns}
                rows={bruksenheter}
                getKey={(b, i) => b.bruksenhetsnr ?? String(i)}
            />
        </>
    )
}