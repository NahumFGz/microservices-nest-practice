import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
  PORT: number
  PRODUCTS_MICROSERVICE_HOST: string
  PRODUCTS_MICROSERVICE_PORT: number
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true)

const validatedEnv = envsSchema.validate(process.env)

if (validatedEnv.error) {
  throw new Error(`Config validation error: ${validatedEnv.error.message}`)
}

const envVars = validatedEnv.value as EnvVars

export const envs = {
  port: envVars.PORT,
  productsMicroservicesHost: envVars.PRODUCTS_MICROSERVICE_HOST,
  productMicroservicesPort: envVars.PRODUCTS_MICROSERVICE_PORT,
}
