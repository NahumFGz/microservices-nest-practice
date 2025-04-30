import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { PrismaClient } from '@prisma/client'
import { RpcException } from '@nestjs/microservices'

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService')

  async onModuleInit() {
    await this.$connect()
    this.logger.log('Orders Database conected')
  }

  create(createOrderDto: CreateOrderDto) {
    return this.order.create({
      data: createOrderDto,
    })
  }

  findAll() {
    return this.order.findMany()
  }

  async findOne(id: string) {
    const order = await this.order.findFirst({
      where: { id: id },
    })

    if (!order) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order with id ${id} not found`,
      })
    }

    return order
  }
}
