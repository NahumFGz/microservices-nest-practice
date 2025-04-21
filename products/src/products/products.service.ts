import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { v4 as UuidV4 } from 'uuid'

@Injectable()
export class ProductsService {
  private products: Product[] = []

  create(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto

    const newProduct = new Product(UuidV4(), name, description, price)
    this.products.push(newProduct)

    return this.products
  }

  findAll() {
    return `This action returns all products`
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
