import { Controller, ParseUUIDPipe } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'
import { OrdersService } from './orders.service'
import { ChangeOrderStatusDto, CreateOrderDto, OrderPaginationDto } from './dto'

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrder')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const paymentSession = await this.ordersService.createPaymentSession(order)

    return {
      order,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      paymentSession,
    }
  }

  @MessagePattern('findAllOrders')
  findAll(@Payload() orderPaginationDto: OrderPaginationDto) {
    return this.ordersService.findAll(orderPaginationDto)
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id)
  }

  @MessagePattern('changeOrderStatus')
  changeOrderStatus(@Payload() changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.ordersService.changeStatus(changeOrderStatusDto)
  }

  @EventPattern('payment.succeeded')
  paidOrder(@Payload() paidOrderDto: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    console.log({ paidOrderDto })

    return
  }
}
