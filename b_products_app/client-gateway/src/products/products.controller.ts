import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { PaginationDto } from 'src/common'
import { PRODUCT_SERVICE } from 'src/config'

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'Crea un producto'
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      )

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return product
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new RpcException(error)
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return 'Esta función elimina el producto ' + id
  }

  @Patch(':id')
  patchProduct(@Param('id') _id: string, @Body() _body: any) {
    return 'Esta función actualiza el producto'
  }
}
