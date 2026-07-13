import { config } from "../config/env.ts"
import { app } from "./app.ts"

export default {
  port: config.port,
  fetch: app.fetch,
}
