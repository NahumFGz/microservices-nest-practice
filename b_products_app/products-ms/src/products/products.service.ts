import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { PrismaClient } from '@prisma/client'
import { PaginationDto } from 'src/common'

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService')

  async onModuleInit() {
    await this.$connect()
    this.logger.log('Database conected')
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto
    const totalPages = await this.product.count()
    const lastPage = Math.ceil(totalPages / limit)

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      metadata: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, _updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
