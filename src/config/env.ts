import { z } from "zod"

const environmentSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65_535).default(3000),
  GOTENBERG_URL: z.string().url().default("http://0.0.0.0:8089"),
  GOTENBERG_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
})

export interface AppConfig {
  port: number
  gotenbergUrl: string
  gotenbergTimeoutMs: number
}

export function loadConfig(
  environment: Record<string, string | undefined> = process.env,
): AppConfig {
  const result = environmentSchema.safeParse(environment)

  if (!result.success) {
    throw new Error(
      `Ugyldig miljøkonfigurasjon:\n${z.prettifyError(result.error)}`,
    )
  }

  return {
    port: result.data.PORT,
    gotenbergUrl: result.data.GOTENBERG_URL,
    gotenbergTimeoutMs: result.data.GOTENBERG_TIMEOUT_MS,
  }
}

export const config = loadConfig()
