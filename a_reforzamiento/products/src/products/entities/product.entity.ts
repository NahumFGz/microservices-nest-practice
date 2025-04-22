interface UpdateWithOptions {
  name?: string
  description?: string
  price?: number
}

export class Product {
  //! Forma 1
  //   public id: string
  //   public name: string
  //   public description?: string
  //   public price: number

  //! Forma 2 -> Con constructor
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
  ) {}

  //TODO: updateWith
  updateWith({ name, description, price }: UpdateWithOptions) {
    this.name = name ?? this.name
    this.description = description ?? this.description
    this.price = price ?? this.price
  }
}
