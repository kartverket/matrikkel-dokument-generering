import { Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { cn } from "../../lib/utils/cn"

interface Props {
  bruksenhetNummer: string | null
  bruksenhetTypeChip: string | null
  bruksenhetSeksjon: string | null
  ingenOppgittBruksenhet: string
  bygningsNr: string | null
}

export function BruksenhetHeader({
  bruksenhetNummer,
  bruksenhetTypeChip,
  bruksenhetSeksjon,
  ingenOppgittBruksenhet,
  bygningsNr,
}: Props) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4 bg-kv-green/5 p-3">
      <div className="flex flex-wrap items-center gap-3">
        <Heading
          level={3}
          data-size="sm"
          className={cn(
            bruksenhetNummer === null && "font-normal text-kv-subtle",
          )}
        >
          {bruksenhetNummer ?? ingenOppgittBruksenhet}
        </Heading>
        {bruksenhetTypeChip && (
          <Tag data-color="accent">{bruksenhetTypeChip}</Tag>
        )}
      </div>
      <div>
        {bruksenhetSeksjon && (
          <Paragraph className="text-kv-subtle text-sm">
            {bruksenhetSeksjon}
          </Paragraph>
        )}
        {bygningsNr && (
          <Paragraph className="text-kv-subtle text-sm">{bygningsNr}</Paragraph>
        )}
      </div>
    </div>
  )
}
