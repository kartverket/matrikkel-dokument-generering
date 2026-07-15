import { Card, Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type { BruksenhetDetalj } from "../../lib/schema/byggRapportSchema"
import { joinStrings } from "../../lib/utils/joinStrings"

interface Props {
  hjemmelshavere: BruksenhetDetalj["hjemmelshavere"]
}

export function Hjemmelshavere({ hjemmelshavere }: Props) {
  const { t } = useTranslation()
  const translationKey = "rapport.BYG0011.hjemmelshavere"

  return (
    <div>
      <Heading level={4} data-size="xs" className="mb-4">
        {t(`${translationKey}.title`)}
      </Heading>
      bu
      {hjemmelshavere.length === 0 ? (
        <Paragraph className="text-kv-subtle text-sm">
          {t("rapport.BYG0011.bruksenheter.tom")}
        </Paragraph>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {hjemmelshavere.map((hjemmelshaver) => {
            return (
              <Card key={hjemmelshaver.eierIdent}>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <Paragraph className="font-semibold">
                    {hjemmelshaver.navn}
                  </Paragraph>
                  <Tag data-color="success" variant="outline">
                    {hjemmelshaver.eierErUtgatt
                      ? t(`${translationKey}.utgatt`)
                      : (hjemmelshaver.statuskode ?? "-")}
                  </Tag>
                </div>

                <dl className="grid grid-cols-3 gap-x-7 gap-y-4">
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.eierIdent`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {hjemmelshaver.eierIdent}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.andel`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {hjemmelshaver.harAndel &&
                      hjemmelshaver.andelTeller !== null &&
                      hjemmelshaver.andelNevner !== null
                        ? `${hjemmelshaver.andelTeller}/${hjemmelshaver.andelNevner}`
                        : "-"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.eierforhold`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {hjemmelshaver.eierforhold}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.adresselinjer`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {joinStrings(
                        [
                          hjemmelshaver.adresselinje1,
                          hjemmelshaver.adresselinje2,
                          hjemmelshaver.adresselinje3,
                          joinStrings(
                            [hjemmelshaver.postnummer, hjemmelshaver.poststed],
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
                      {hjemmelshaver.land ?? "-"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.gyldigFra`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {hjemmelshaver.datofra ?? "-"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.gyldigTil`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {hjemmelshaver.datotil ?? "-"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.kategori`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {hjemmelshaver.kategorikode ?? "-"}
                    </dd>
                  </div>
                </dl>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
