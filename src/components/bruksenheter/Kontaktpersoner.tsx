import { Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../../lib/schema/byggRapportSchema"
import { joinStrings } from "../../lib/utils/joinStrings"

interface Props {
  kontaktpersoner: BruksenhetDetalj["kontaktpersoner"]
}

export function Kontaktpersoner({ kontaktpersoner }: Props) {
  const { t } = useTranslation()
  const translationKey = "rapport.BYG0011.kontaktpersoner"

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>

      {kontaktpersoner.length === 0 ? (
        <Paragraph className="text-kv-subtle text-sm">
          {t("rapport.BYG0011.bruksenheter.tom")}
        </Paragraph>
      ) : (
        <div className="flex flex-col gap-3">
          {kontaktpersoner.map((kontaktperson) => (
            <div
              key={kontaktperson.eierIdent}
              className="rounded-md border border-kv-border bg-kv-gray p-4"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <Paragraph className="font-semibold">
                  {kontaktperson.navn}
                </Paragraph>
                <Tag data-color="neutral" variant="outline">
                  {kontaktperson.eierErUtgatt
                    ? t(`${translationKey}.utgatt`)
                    : (kontaktperson.statuskode ?? "-")}
                </Tag>
              </div>

              <dl className="grid grid-cols-3 gap-x-7 gap-y-4">
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.rolle`)}
                  </dt>
                  <dd className="mt-1 font-medium">{kontaktperson.rolle}</dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.eierIdent`)}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {kontaktperson.eierIdent}
                  </dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.kategori`)}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {joinStrings(
                      [
                        kontaktperson.kategorikode,
                        kontaktperson.kontaktpersonKode,
                      ],
                      " / ",
                    )}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.adresselinjer`)}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {joinStrings(
                      [
                        kontaktperson.adresselinje1,
                        kontaktperson.adresselinje2,
                        kontaktperson.adresselinje3,
                        joinStrings(
                          [
                            kontaktperson.postnummeromradenr,
                            kontaktperson.postnummeromradenavn,
                          ],
                          " ",
                        ),
                      ],
                      ", ",
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.land`)}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {kontaktperson.land ?? "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-kv-subtle text-sm">
                    {t(`${translationKey}.gyldigFra`)}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {kontaktperson.datofra ?? "-"}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
