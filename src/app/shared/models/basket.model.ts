import {
  Product,
  Ingredient,
  IngredientSet,
  IngredientSetDTO,
} from './product.model';
import { v4 as uuid } from 'uuid';
import { User, UserDTO } from './user.model';

export interface BasketOrderDTO {
  amount: number;
  //
  // id: string;
  // productId: string;
  // ingredientIds: string[];
  //
  name: string;
  price: number;
  totalPrice: number;
  ingredients: IngredientSetDTO[];
}

export interface BasketDTO {
  id: string;
  commonPrice: number;
  //
  // basketOrderIds: string[];
  // userId: string;
  //
  user: UserDTO;
  basketOrders: BasketOrderDTO[];
  timestamp: number;
}

export class BasketOrder {
  public id: string;
  public product: Product;
  public options: IngredientSet[];
  public amount: number;
  public totalPrice: number;

  constructor(prod: Product, opt: IngredientSet[]) {
    this.product = prod;
    this.options = opt.map((item) => Object.assign({}, item));
    this.amount = 1;
    this.id = uuid();
    this.totalPrice = prod.cost;
  }

  public compareIngredient(order: BasketOrder): boolean {
    if (order.product.id !== this.product.id) return false;

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

  constructor(public userId: string | undefined) {
    this.products = [];
    this.commonPrice = 0;
    this.id = uuid();
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
    this.products = this.products.filter((item) => item.id !== id);
    this.calculatePrice();
  }

  private calculatePrice() {
    this.commonPrice = this.products.reduce(
      (acc, item) => (acc += item.totalPrice * item.amount),
      0
    );
  }
}
