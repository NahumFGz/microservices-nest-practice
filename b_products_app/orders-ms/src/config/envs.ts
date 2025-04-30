import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
  PORT: number

  PRODUCTS_MICROSERVICES_HOST: string
  PRODUCTS_MICROSERVICES_PORT: number
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
  })
  .unknown(true)

const validatedEnv = envsSchema.validate(process.env)

if (validatedEnv.error) {
  throw new Error(`Config validation error: ${validatedEnv.error.message}`)
}

const envVars = validatedEnv.value as EnvVars

export const envs = {
  port: envVars.PORT,
  productsMicroservicesHost: envVars.PRODUCTS_MICROSERVICES_HOST,
  productsMicroservicesPort: envVars.PRODUCTS_MICROSERVICES_PORT,
}
