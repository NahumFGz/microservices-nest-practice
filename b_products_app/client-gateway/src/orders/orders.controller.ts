import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'

@Controller('orders')
export class OrdersController {
  constructor() {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto)
  }

  @Get()
  findAll() {
    return this.ordersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id)
  }
}
