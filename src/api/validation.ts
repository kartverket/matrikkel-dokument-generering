import { z } from "@hono/zod-openapi"

export function createValidationErrors(
  issues: z.ZodIssue[],
): Record<string, string[]> {
  return issues.reduce<Record<string, string[]>>((errors, issue) => {
    const path = issue.path.join(".") || "$"

    errors[path] ??= []
    errors[path].push(issue.message)

    return errors
  }, {})
}