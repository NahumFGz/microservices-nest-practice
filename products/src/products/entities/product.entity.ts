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
}
