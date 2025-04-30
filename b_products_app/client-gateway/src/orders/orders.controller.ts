import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'

import { ORDERS_SERVICE } from 'src/config'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { CreateOrderDto, OrderPaginationDto } from './dto'
import { firstValueFrom } from 'rxjs'

interface OrderType {
  id: string
  totalAmount: number
  totalItems: number
  status: string
  paid: boolean
}

type ErrorType = {
  status: number
  message: string
}

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto)
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderPaginationDto)
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send<OrderType>('findOneOrder', { id: id }),
      )

      return order
    } catch (error) {
      throw new RpcException(error as ErrorType)
    }
  }
}
