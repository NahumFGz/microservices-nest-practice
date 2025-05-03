/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { PrismaClient } from '@prisma/client'
import { RegisterUserDto } from './dto'

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Auth Service')

  async onModuleInit() {
    await this.$connect()
    this.logger.log('MongoDB connected')
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, name, password } = registerUserDto

    try {
      const user = await this.user.findUnique({
        where: {
          email: email,
        },
      })

      if (user) {
        throw new RpcException({
          status: 400,
          message: 'User already exists',
        })
      }

      const newUser = await this.user.create({
        data: {
          email: email,
          password: password, //TODO: encriptar
          name: name,
        },
      })

      return {
        user: newUser,
        token: 'ABC',
      }
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      })
    }
  }
}
