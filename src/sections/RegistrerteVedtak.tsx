import { Table, Paragraph } from "@kv-designsystem/react"
import type { BygningsDatoerSchema } from "../lib/schema/byggRapportSchema"

interface RegistrerteVedtakProps {
    datoer: BygningsDatoerSchema
}

export default function RegistrerteVedtak({ datoer }: RegistrerteVedtakProps) {
    return (
        <section className="py-4 max-w-md">
            <Paragraph className="text-sm font-light">Registrerte Vedtak</Paragraph>
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
                    {datoer.tattIBruk && (
                        <Table.Row>
                            <Table.Cell>Tatt i bruk</Table.Cell>
                            <Table.Cell>{datoer.tattIBruk}</Table.Cell>
                        </Table.Row>
                    )}
                    {datoer.utgaattRevet && (
                        <Table.Row>
                            <Table.Cell>Utgått / revet</Table.Cell>
                            <Table.Cell>{datoer.utgaattRevet}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </section>
    )
}
