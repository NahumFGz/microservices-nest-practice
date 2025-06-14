import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
  PORT: number
  STRIPE_SECRET: string
  STRIPE_SUCCESS_URL: string
  STRIPE_CANCEL_URL: string
  STRIPE_ENDPOINT_SECRET: string
  NATS_SERVERS: string[]
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
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
  stripeSecret: envVars.STRIPE_SECRET,
  stripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
  stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
  stripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
  natsServers: envVars.NATS_SERVERS,
}
