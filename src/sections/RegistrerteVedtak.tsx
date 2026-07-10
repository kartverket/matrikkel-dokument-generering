import { Table } from "@kv-designsystem/react"

interface RegistrerteVedtakProps {
    Rammetillatelse?: string | null
    Igangsettingstillatelse?: string | null
    MidlertidigBrukstillatelse?: string | null
    Ferdigattest?: string | null
}

export default function RegistrerteVedtak({ Rammetillatelse, Igangsettingstillatelse, MidlertidigBrukstillatelse, Ferdigattest }: RegistrerteVedtakProps) {
    return (
        <section className="py-4 max-w-md">
            <p className="text-sm font-light">Registrerte Vedtak</p>
            <Table>
                <Table.Head>
                    <Table.Row>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Dato</Table.HeaderCell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {Rammetillatelse && (
                        <Table.Row>
                            <Table.Cell>Rammetillatelse</Table.Cell>
                            <Table.Cell>{Rammetillatelse}</Table.Cell>
                        </Table.Row>
                    )}
                    {Igangsettingstillatelse && (
                        <Table.Row>
                            <Table.Cell>Igangsettingstillatelse</Table.Cell>
                            <Table.Cell>{Igangsettingstillatelse}</Table.Cell>
                        </Table.Row>
                    )}
                    {MidlertidigBrukstillatelse && (
                        <Table.Row>
                            <Table.Cell>Midlertidig brukstillatelse</Table.Cell>
                            <Table.Cell>{MidlertidigBrukstillatelse}</Table.Cell>
                        </Table.Row>
                    )}
                    {Ferdigattest && (
                        <Table.Row>
                            <Table.Cell>Ferdigattest</Table.Cell>
                            <Table.Cell>{Ferdigattest}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </section>
    )
}
