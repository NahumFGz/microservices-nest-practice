import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common'

import { NATS_SERVICE } from 'src/config'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto'
import { firstValueFrom } from 'rxjs'
import { PaginationDto } from 'src/common'

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
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto)
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', orderPaginationDto)
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send<OrderType>('findOneOrder', { id: id }),
      )

      return order
    } catch (error) {
      throw new RpcException(error as ErrorType)
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      const order = await firstValueFrom(
        this.client.send<OrderType>('findAllOrders', {
          ...paginationDto,
          status: statusDto.status,
        }),
      )

      return order
    } catch (error) {
      throw new RpcException(error as ErrorType)
    }
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.client.send('changeOrderStatus', {
        id,
        status: statusDto.status,
      })
    } catch (error) {
      throw new RpcException(error as ErrorType)
    }
  }
}
