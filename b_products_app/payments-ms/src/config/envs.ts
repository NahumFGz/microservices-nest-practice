import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
  PORT: number
  STRIPE_SECRET: string
  STRIPE_WEBHOOK_SECRET: string
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_WEBHOOK_SECRET: joi.string().required(),
  })
  .unknown(true)

const validatedEnv = envsSchema.validate(process.env)

if (validatedEnv.error) {
  throw new Error(`Config validation error: ${validatedEnv.error.message}`)
}

const envVars = validatedEnv.value as EnvVars

export const envs = {
  port: envVars.PORT,
  stripeSecret: envVars.STRIPE_SECRET,
  stripeWebHookSecret: envVars.STRIPE_WEBHOOK_SECRET,
}
