import { Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { cn } from "../../lib/utils/cn"

interface Props {
  bruksenhetNummer: string | null
  bruksenhetTypeChip: string | null
  bruksenhetSeksjon: string | null
  ingenOppgittBruksenhet: string
}

export function BruksenhetHeader({
  bruksenhetNummer,
  bruksenhetTypeChip,
  bruksenhetSeksjon,
  ingenOppgittBruksenhet,
}: Props) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
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
          <Tag data-color="accent" variant="outline">
            {bruksenhetTypeChip}
          </Tag>
        )}
      </div>
      {bruksenhetSeksjon && (
        <Paragraph className="text-kv-subtle text-sm">
          {bruksenhetSeksjon}
        </Paragraph>
      )}
    </div>
  )
}
