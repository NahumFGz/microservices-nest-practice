/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { NATS_SERVICE } from 'src/config'
import { LoginUserDto, RegisterUserDto } from './dto'
import { catchError } from 'rxjs'
import { Request } from 'express'
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(error)
      }),
    )
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(error)
      }),
    )
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyUser(@Req() req: Request) {
    const user = req['user']
    const token = req['token']

    //return this.client.send('auth.verify.user', {})
    return { user, token }
  }
}
