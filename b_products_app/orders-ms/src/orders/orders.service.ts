import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { PrismaClient } from '@prisma/client'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { ChangeOrderStatusDto, OrderPaginationDto } from './dto'
import { PRODUCT_SERVICE } from 'src/config/services'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService')

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {
    super()
  }

  async onModuleInit() {
    await this.$connect()
    this.logger.log('Orders Database conected')
  }

  async create(createOrderDto: CreateOrderDto) {
    // return this.order.create({
    //   data: createOrderDto,
    // })

    const ids = [5, 600]

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const products = await firstValueFrom(
      this.productsClient.send({ cmd: 'validate_products' }, ids),
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return products
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const { page = 1, limit = 10, status } = orderPaginationDto

    const totalPages = await this.order.count({
      where: { status: status },
    })
    const currentPage = page
    const perPage = limit

    return {
      data: await this.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: { status: status },
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
      },
    }
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

  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto

    const order = await this.findOne(id)

    //!Si la orden no cambia, no es necesario llamar a la BD
    if (order.status === status) {
      return order
    }

    return this.order.update({
      where: { id: id },
      data: {
        status: status,
      },
    })
  }
}
