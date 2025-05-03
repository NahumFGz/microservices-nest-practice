/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
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

      //const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await this.user.create({
        data: {
          email: email,
          password: bcrypt.hashSync(password, 10),
          name: name,
        },
      })

      const { password: _, ...rest } = newUser

      return {
        user: rest,
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
