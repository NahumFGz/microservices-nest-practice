import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { envs } from './config/envs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Solo traer lo q está definido en el DTO
      forbidNonWhitelisted: true, //Error si hay mas datos q no están en el DTO
    }),
  )

  await app.listen(envs.port ?? 3000)
  console.log(`Server running on port ${envs.port}`)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
