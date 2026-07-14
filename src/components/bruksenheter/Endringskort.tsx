import { Card, Heading, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../../lib/schema/byggRapportSchema"

export function Endringskort({
  endring,
}: {
  endring: BruksenhetDetalj["endringer"][number]
}) {
  const { t } = useTranslation()
  const translationKey = "rapport.BYG0011.bruksenheter"

  return (
    <Card
      data-endring-id={endring.id}
      variant="default"
      className="border border-kv-border bg-kv-gray"
    >
      <Card.Block className="p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Heading level={5} data-size="xs" className="font-medium">
            {endring.tittel}
          </Heading>
          <Tag data-color="accent" variant="outline">
            {endring.status}
          </Tag>
        </div>

        <dl className="grid grid-cols-3 gap-x-7 gap-y-4">
          <div>
            <dt className="text-kv-subtle text-sm">
              {t(`${translationKey}.endringskode`)}
            </dt>
            <dd className="mt-1 font-medium">{endring.endringskode}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-kv-subtle text-sm">
              {t(`${translationKey}.endringsbeskrivelse`)}
            </dt>
            <dd className="mt-1 font-medium">{endring.beskrivelse}</dd>
          </div>
          <div>
            <dt className="text-kv-subtle text-sm">
              {t(`${translationKey}.bygningstype`)}
            </dt>
            <dd className="mt-1 font-medium">{endring.bygningstype}</dd>
          </div>
          <div>
            <dt className="text-kv-subtle text-sm">
              {t(`${translationKey}.bebygdArealEndring`)}
            </dt>
            <dd className="mt-1 font-medium">{endring.bebygdAreal}</dd>
          </div>
          <div>
            <dt className="text-kv-subtle text-sm">
              {t(`${translationKey}.rammetillatelse`)}
            </dt>
            <dd className="mt-1 font-medium">{endring.rammetillatelse}</dd>
          </div>
          <div>
            <dt className="text-kv-subtle text-sm">
              {t(`${translationKey}.igangsettingstillatelse`)}
            </dt>
            <dd className="mt-1 font-medium">
              {endring.igangsettingstillatelse}
            </dd>
          </div>
          <div>
            <dt className="text-kv-subtle text-sm">
              {t(`${translationKey}.ferdigattest`)}
            </dt>
            <dd className="mt-1 font-medium">{endring.ferdigattest}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-kv-subtle text-sm">
              {t(`${translationKey}.koordinater`)}
            </dt>
            <dd className="mt-1 font-medium">{endring.koordinater}</dd>
          </div>
        </dl>
      </Card.Block>
    </Card>
  )
}
