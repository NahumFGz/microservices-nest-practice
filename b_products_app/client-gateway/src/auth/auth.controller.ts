import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { NATS_SERVICE } from 'src/config'
import { LoginUserDto, RegisterUserDto } from './dto'
import { catchError } from 'rxjs'
import { Request } from 'express'
import { AuthGuard } from './guards/auth.guard'
import { Token, User } from './decorators'
import { CurrentUser } from './interfaces/current-user.interface'

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
  verifyUser(@User() user: CurrentUser, @Token() token: string) {
    //return this.client.send('auth.verify.user', {})
    return { user, token }
  }
}
