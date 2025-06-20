import { IsNumber, IsPositive } from 'class-validator'

export class OrderItemDto {
  @IsNumber()
  @IsPositive()
  productId: number

  @IsNumber()
  @IsPositive()
  quantity: number

  @IsNumber()
  // @Type(() => Number)
  price: number
}
