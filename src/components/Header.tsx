type HeaderProps = {
    rapportType: string;
    tittel: string;
    kommune: { nr: string; navn: string };
    koordinatsystem: string;
    generertTidspunkt: string;
};

export function Header({ rapportType, tittel, kommune, koordinatsystem, generertTidspunkt }: HeaderProps) {
    return (
        <div>
            <h1>{tittel} – {rapportType}</h1>
            <p>Kommune: {kommune.navn}</p>
            <p>Kommunenummer: {kommune.nr}</p>
            <p>Koordinatsystem: {koordinatsystem}</p>
            <p>Generert: {new Date(generertTidspunkt).toLocaleString("nb")}</p>
        </div>
    );
}
