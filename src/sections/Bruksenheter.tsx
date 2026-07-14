import { Card, Divider, Heading, Paragraph, Tag } from "@kv-designsystem/react"
import { useTranslation } from "react-i18next"
import type {
  Bruksenhet,
  Hjemmelshaver,
} from "../lib/schema/byggRapportSchema.ts"
import { formatArea } from "../lib/utils/format"

interface BruksenheterProps {
  bruksenheter: Bruksenhet[]
  kommunenr: string
  hjemmelshavere?: Hjemmelshaver[] | null
}

const UNUMMERERT_BRUKSENHET = "unummerert bruksenhet"

const ETASJENAVN = {
  H: "Hovedetasje",
  L: "Loft",
  U: "Underetasje",
  K: "Kjeller",
} as const

function formatIdentity(value: string) {
  const digits = value.replace(/\D/g, "")

  if (digits.length === 6 || digits.length === 8 || digits.length === 11) {
    let day = Number(digits.slice(0, 2))
    let month = Number(digits.slice(2, 4))
    const shortYear = Number(digits.slice(4, 6))

    if (day > 40) day -= 40
    if (month > 40) month -= 40

    let year = digits.length === 8 ? Number(digits.slice(4, 8)) : shortYear
    if (digits.length === 11) {
      const individualNumber = Number(digits.slice(6, 9))
      if (individualNumber <= 499) year += 1900
      else if (individualNumber <= 749 && shortYear >= 54) year += 1800
      else if (shortYear <= 39) year += 2000
      else year += 1900
    }

    if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
      return {
        label: "Født",
        value: `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`,
      }
    }
  }

  if (digits.length === 9) {
    return {
      label: "Org.nr.",
      value: `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`,
    }
  }

  return { label: "Født/org.nr.", value }
}

function formatEtasje(bruksenhet: Bruksenhet, emptyValue: string) {
  if (bruksenhet.etasjeplankode === null || bruksenhet.etasjenummer === null) {
    return emptyValue
  }

  const code = `${bruksenhet.etasjeplankode}${String(bruksenhet.etasjenummer).padStart(2, "0")}`
  return `${ETASJENAVN[bruksenhet.etasjeplankode]} (${code})`
}

function formatSeksjon(bruksenhet: Bruksenhet, kommunenr: string) {
  const { gnr, bnr, fnr, snr } = bruksenhet.matrikkelenhet
  return `${kommunenr}-${gnr}/${bnr}/${fnr ?? 0}/${snr ?? 0}`
}

function getHjemmelshavere(
  bruksenhet: Bruksenhet,
  hjemmelshavere: Hjemmelshaver[],
) {
  const isSameMatrikkelenhet = (hjemmelshaver: Hjemmelshaver) =>
    hjemmelshaver.matrikkelenhet?.gnr === bruksenhet.matrikkelenhet.gnr &&
    hjemmelshaver.matrikkelenhet.bnr === bruksenhet.matrikkelenhet.bnr &&
    hjemmelshaver.matrikkelenhet.fnr === bruksenhet.matrikkelenhet.fnr &&
    hjemmelshaver.matrikkelenhet.snr === bruksenhet.matrikkelenhet.snr

  return hjemmelshavere.filter(
    (hjemmelshaver) =>
      hjemmelshaver.bruksenhetsnr === bruksenhet.bruksenhetsnr ||
      isSameMatrikkelenhet(hjemmelshaver),
  )
}

function formatHjemmelshaverMeta(
  hjemmelshaver: Hjemmelshaver,
  emptyValue: string,
) {
  const andel =
    hjemmelshaver.andelTeller !== null && hjemmelshaver.andelNevner !== null
      ? `${hjemmelshaver.andelTeller}/${hjemmelshaver.andelNevner}`
      : emptyValue
  const ident = formatIdentity(hjemmelshaver.eierIdent)
  return `Andel ${andel} · ${ident.label} ${ident.value}`
}

export default function Bruksenheter({
  bruksenheter,
  kommunenr,
  hjemmelshavere = [],
}: BruksenheterProps) {
  const { t } = useTranslation()
  const translationKey = "rapport.BYG0011.bruksenheter"
  const emptyValue = t(`${translationKey}.tom`)

  return (
    <section className="my-16">
      <div className="mb-7 flex items-baseline gap-4 border-kv-blue border-b-2 pb-3">
        <span className="font-extrabold text-kv-blue text-sm tracking-widest tabular-nums">
          04
        </span>
        <Heading level={2} data-size="md">
          {t(`${translationKey}.title`)}
        </Heading>
        <Paragraph className="ml-auto text-kv-subtle text-sm">
          {t(`${translationKey}.description`)}
        </Paragraph>
      </div>

      <div className="flex flex-col gap-5">
        {bruksenheter.map((bruksenhet) => {
          const isUnummerert =
            bruksenhet.type.toLocaleLowerCase("nb") === UNUMMERERT_BRUKSENHET
          const displayNumber = isUnummerert
            ? bruksenhet.type
            : (bruksenhet.bruksenhetsnr ?? emptyValue)
          const isSectioned = bruksenhet.matrikkelenhet.snr !== null
          const eiere = getHjemmelshavere(bruksenhet, hjemmelshavere ?? [])

          return (
            <Card
              key={
                bruksenhet.bruksenhetsnr ??
                [
                  bruksenhet.type,
                  bruksenhet.matrikkelenhet.gnr,
                  bruksenhet.matrikkelenhet.bnr,
                  bruksenhet.matrikkelenhet.fnr,
                  bruksenhet.matrikkelenhet.snr,
                  bruksenhet.adresse,
                ].join("-")
              }
              className="break-inside-avoid border border-kv-border"
            >
              <Card.Block className="p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Heading level={3} data-size="sm">
                      {displayNumber}
                    </Heading>
                    {!isUnummerert && (
                      <Tag data-color="accent" variant="outline">
                        {bruksenhet.type}
                      </Tag>
                    )}
                  </div>
                  {isSectioned && (
                    <Paragraph className="text-kv-subtle text-sm">
                      {t(`${translationKey}.seksjon`)}{" "}
                      {formatSeksjon(bruksenhet, kommunenr)}
                    </Paragraph>
                  )}
                </div>

                <dl className="grid grid-cols-3 gap-x-8 gap-y-5">
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.bruksenhetstype`)}
                    </dt>
                    <dd className="mt-1 font-medium">{bruksenhet.type}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.adresse`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {bruksenhet.adresse ?? emptyValue}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.etasje`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {formatEtasje(bruksenhet, emptyValue)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.bruksareal`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {formatArea(bruksenhet.bruksareal)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.antallRom`)}
                    </dt>
                    <dd className="mt-1 font-medium">{bruksenhet.antallRom}</dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.kjokken`)}
                    </dt>
                    <dd className="mt-1 font-medium">
                      {bruksenhet.kjokkentilgang === null
                        ? emptyValue
                        : t(
                            `${translationKey}.${bruksenhet.kjokkentilgang ? "jaMedAntall" : "neiMedAntall"}`,
                          )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.antallBad`)}
                    </dt>
                    <dd className="mt-1 font-medium">{bruksenhet.antallBad}</dd>
                  </div>
                  <div>
                    <dt className="text-kv-subtle text-sm">
                      {t(`${translationKey}.antallWc`)}
                    </dt>
                    <dd className="mt-1 font-medium">{bruksenhet.antallWc}</dd>
                  </div>
                </dl>

                {isSectioned && (
                  <>
                    <Divider className="my-6" />
                    <Paragraph className="mb-3 font-bold text-kv-subtle text-xs tracking-wide">
                      {t(`${translationKey}.hjemmelshaverEier`)}
                    </Paragraph>
                    <div className="flex flex-col gap-3">
                      {(eiere.length > 0 ? eiere : [null]).map((eier) =>
                        eier ? (
                          <div
                            key={eier.eierIdent}
                            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
                          >
                            <Paragraph className="font-semibold">
                              {eier.navn}
                            </Paragraph>
                            <Paragraph className="text-kv-subtle text-sm">
                              {formatHjemmelshaverMeta(eier, emptyValue)}
                            </Paragraph>
                          </div>
                        ) : (
                          <Paragraph
                            key="empty-owner"
                            className="font-semibold"
                          >
                            {emptyValue}
                          </Paragraph>
                        ),
                      )}
                    </div>
                  </>
                )}

                <Divider className="my-6" />
                <Paragraph className="text-kv-subtle text-sm">
                  {t(`${translationKey}.ingenEndringer`)}
                </Paragraph>
              </Card.Block>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
