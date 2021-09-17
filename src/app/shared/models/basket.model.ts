import { Product, ProductOption } from './product.model';

export class BasketOrder {
  product: Product;
  options: ProductOption[];

  constructor(prod: Product, opt: ProductOption[]) {
    this.product = prod;
    this.options = opt.map((item) => Object.assign({}, item));
  }
}

export class Basket {
  products: BasketOrder[];
  commonPrice: number;

  constructor() {
    this.products = [];
    this.commonPrice = 0;
  }

  addProduct(prod: BasketOrder) {
    this.products.push(prod);

    this.commonPrice = this.products.reduce(
      (acc, item) => (acc += item.product.cost),
      0
    );
  }

  removeProduct(id: string) {
    this.products = this.products.filter((item) => item.product.id !== id);

    this.commonPrice = this.products.reduce(
      (acc, item) => (acc += item.product.cost),
      0
    );
  }
}
