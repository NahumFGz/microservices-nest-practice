import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Response } from 'express'

interface RpcError {
  status: number | string
  message: string
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const rpcError = exception.getError()

    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const { status, message } = rpcError as RpcError

      const statusCode = isNaN(Number(status)) ? 400 : Number(status)

      return response.status(statusCode).json({ status: statusCode, message })
    }

    response.status(400).json({
      status: 400,
      message: rpcError,
    })
  }
}
