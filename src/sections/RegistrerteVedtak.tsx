import { Table, Paragraph } from "@kv-designsystem/react"
import type { BygningsDatoerSchema } from "../lib/schema/byggRapportSchema"

export default function RegistrerteVedtak({
    rammetillatelse,
    igangsettingstillatelse,
    midlertidigBrukstillatelse,
    ferdigattest }:
    BygningsDatoerSchema) {

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
                    {rammetillatelse && (
                        <Table.Row>
                            <Table.Cell>Rammetillatelse</Table.Cell>
                            <Table.Cell>{rammetillatelse}</Table.Cell>
                        </Table.Row>
                    )}
                    {igangsettingstillatelse && (
                        <Table.Row>
                            <Table.Cell>Igangsettingstillatelse</Table.Cell>
                            <Table.Cell>{igangsettingstillatelse}</Table.Cell>
                        </Table.Row>
                    )}
                    {midlertidigBrukstillatelse && (
                        <Table.Row>
                            <Table.Cell>Midlertidig brukstillatelse</Table.Cell>
                            <Table.Cell>{midlertidigBrukstillatelse}</Table.Cell>
                        </Table.Row>
                    )}
                    {ferdigattest && (
                        <Table.Row>
                            <Table.Cell>Ferdigattest</Table.Cell>
                            <Table.Cell>{ferdigattest}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </section>
    )
}
