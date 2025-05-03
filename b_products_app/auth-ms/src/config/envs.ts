import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
  PORT: number

  NATS_SERVERS: string[]
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),

    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true)

const validatedEnv = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
})

if (validatedEnv.error) {
  throw new Error(`Config validation error: ${validatedEnv.error.message}`)
}

const envVars = validatedEnv.value as EnvVars

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
}
