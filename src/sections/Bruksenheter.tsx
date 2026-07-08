import { DataTable } from "../components/DataTable.tsx";
import type { Column } from "../types.ts";
import type { Bruksenhet } from "../lib/schema/byggRapportSchema.ts";

interface BruksenhetProps {
    bruksenheter: Bruksenhet[]
}

const columns: Column<Bruksenhet>[] = [
    { header: "Bruksenhetsnr", render: (b) => b.bruksenhetsnr ?? "–" },
    { header: "Type", render: (b) => b.type },
    { header: "Matrikkelenhet", render: (b) => `${b.matrikkelenhet.gnr}/${b.matrikkelenhet.bnr}` },
    { header: "Adresse", render: (b) => b.adresse ?? "–" },
    { header: "BRA", render: (b) => `${b.bruksareal} m²` },
    { header: "Rom", render: (b) => String(b.antallRom) },
    { header: "Bad", render: (b) => String(b.antallBad) },
    { header: "WC", render: (b) => String(b.antallWc) },
]

export default function Bruksenheter({ bruksenheter }: BruksenhetProps) {
    return (
        <>
            <h2>Bruksenheter</h2>
            <DataTable
                columns={columns}
                rows={bruksenheter}
                getKey={(b, i) => b.bruksenhetsnr ?? String(i)}
            />
        </>
    )
}