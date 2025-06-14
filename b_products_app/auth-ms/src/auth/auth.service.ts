/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { LoginUserDto, RegisterUserDto } from './dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { envs } from 'src/config'

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Auth Service')

  constructor(private readonly jwtService: JwtService) {
    //Prisma client necesita una inicialización y por eso se hereda
    super()
  }

  async onModuleInit() {
    await this.$connect()
    this.logger.log('MongoDB connected')
  }

  async signJWT(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload)
  }

  async verifyToken(token: string) {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      })

      return {
        user: user,
        token: await this.signJWT(user),
      }
    } catch (error) {
      console.log(error)
      throw new RpcException({
        status: 401,
        message: 'Invalid token',
      })
    }
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
        token: await this.signJWT(rest),
      }
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      })
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto

    try {
      const user = await this.user.findUnique({
        where: {
          email: email,
        },
      })

      if (!user) {
        throw new RpcException({
          status: 400,
          message: 'Invalid credentials',
        })
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password)

      if (!isPasswordValid) {
        throw new RpcException({
          status: 400,
          message: 'user/password not valid',
        })
      }

      const { password: _, ...rest } = user

      return {
        user: rest,
        token: await this.signJWT(rest),
      }
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      })
    }
  }
}
