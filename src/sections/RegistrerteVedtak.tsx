import { Table } from "@kv-designsystem/react"

interface RegistrerteVedtakProps {
    datoer: {
        rammetillatelse: string | null
        igangsettingstillatelse: string | null
        midlertidigBrukstillatelse: string | null
        ferdigattest: string | null
    }
    lopenr: number
}

export default function RegistrerteVedtak({ datoer, lopenr }: RegistrerteVedtakProps) {
    return (
        <section className="py-4 max-w-md">
            <p className="text-sm font-light">Registrerte Vedtak</p>
            <p>Løpenr: {lopenr}</p>
            <Table>
                <Table.Head>
                    <Table.Row>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Dato</Table.HeaderCell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {datoer.rammetillatelse && (
                        <Table.Row>
                            <Table.Cell>Rammetillatelse</Table.Cell>
                            <Table.Cell>{datoer.rammetillatelse}</Table.Cell>
                        </Table.Row>
                    )}
                    {datoer.igangsettingstillatelse && (
                        <Table.Row>
                            <Table.Cell>Igangsettingstillatelse</Table.Cell>
                            <Table.Cell>{datoer.igangsettingstillatelse}</Table.Cell>
                        </Table.Row>
                    )}
                    {datoer.midlertidigBrukstillatelse && (
                        <Table.Row>
                            <Table.Cell>Midlertidig brukstillatelse</Table.Cell>
                            <Table.Cell>{datoer.midlertidigBrukstillatelse}</Table.Cell>
                        </Table.Row>
                    )}
                    {datoer.ferdigattest && (
                        <Table.Row>
                            <Table.Cell>Ferdigattest</Table.Cell>
                            <Table.Cell>{datoer.ferdigattest}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </section>
    )
}
