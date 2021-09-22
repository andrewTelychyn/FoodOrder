import { Product, Ingredient, IngredientSet } from './product.model';

export interface BasketOrderDTO {
  id: string;
  productId: string;
  ingredientIds: string[];
  amount: number;
}

export interface BasketDTO {
  id: string;
  basketOrderIds: string[];
  commonPrice: number;
  userId: string;
}

export class BasketOrder {
  public id: string;
  public product: Product;
  public options: IngredientSet[];
  public amount: number;

  constructor(prod: Product, opt: IngredientSet[]) {
    this.product = prod;
    this.options = opt.map((item) => Object.assign({}, item));
    this.amount = 1;
    this.id = String(Date.now());
  }

  public compareIngredient(order: BasketOrder): boolean {
    if (order.product.id !== this.product.id) return false;

    // let value = this.options.filter((thisProduct) => {
    //   let opt = order.options.find((i) => i.id == thisProduct.id);
    //   return thisProduct.optionAmount !== opt?.optionAmount;
    // });

    let value = this.options.filter((thisProduct) => {
      let opt = order.options.find(
        (i) => i.ingredient.id == thisProduct.ingredient.id
      );
      return thisProduct.amount !== opt?.amount;
    });

    return value.length === 0;
  }
}

export class Basket {
  public id: string;
  public products: BasketOrder[];
  public commonPrice: number;

  constructor(public userId: string) {
    this.products = [];
    this.commonPrice = 0;
    this.id = String(Date.now());
  }

  // public get commonPrice() {
  //   return this.products.reduce(
  //     (acc, item) => (acc += item.product.cost * item.amount),
  //     0
  //   );
  // }

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

    this.calculatePrice();
  }

  public increaseOne(item: BasketOrder) {
    this.products.map((elem) => {
      if (item === elem) elem.amount += 1;
    });

    this.calculatePrice();
  }

  public decreaseOne(item: BasketOrder) {
    this.products.map((elem) => {
      if (item === elem) {
        if (elem.amount - 1 >= 1) elem.amount -= 1;
        else this.removeProduct(elem.product.id);
      }
    });

    this.calculatePrice();
  }

  public removeProduct(id: string) {
    this.products = this.products.filter((item) => item.product.id !== id);
    this.calculatePrice();
  }

  private calculatePrice() {
    this.commonPrice = this.products.reduce(
      (acc, item) => (acc += item.product.cost * item.amount),
      0
    );
  }
}
