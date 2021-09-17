import { Product, Ingredient } from './product.model';

export class BasketOrder {
  public product: Product;
  public options: Ingredient[];
  public amount: number;

  constructor(prod: Product, opt: Ingredient[]) {
    this.product = prod;
    this.options = opt.map((item) => Object.assign({}, item));
    this.amount = 1;
  }

  public compareIngredient(order: BasketOrder): boolean {
    if (order.product.id !== this.product.id) return false;

    let value = this.options.filter((thisProduct) => {
      let opt = order.options.find((i) => i.id == thisProduct.id);
      return thisProduct.optionAmount !== opt?.optionAmount;
    });

    return value.length === 0;
  }

  public removeOne() {
    if (this.amount - 1 >= 1) this.amount -= 1;
  }

  public addOne() {
    this.amount += 1;
  }
}

export class Basket {
  public products: BasketOrder[];

  constructor() {
    this.products = [];
  }

  public get commonPrice() {
    return this.products.reduce(
      (acc, item) => (acc += item.product.cost * item.amount),
      0
    );
  }

  public addProduct(prod: BasketOrder) {
    let found = false;

    let value = this.products.map((item) => {
      if (!found && item.compareIngredient(prod)) {
        item.amount += 1;
        found = true;
      }
      return item;
    });

    found ? (this.products = value) : this.products.push(prod);
  }

  public removeProduct(id: string) {
    this.products = this.products.filter((item) => item.product.id !== id);
  }

  // private calculatePrice() {
  //   this.commonPrice = this.products.reduce(
  //     (acc, item) => (acc += item.product.cost),
  //     0
  //   );
  // }
}
