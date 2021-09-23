// export type ProductTypes = 'burger' | 'desert' | 'drink';

export enum ProductTypes {
  burger = 'burger',
  desert = 'desert',
  drink = 'drink',
}

export interface Product {
  id: string;
  type?: ProductTypes;
  categoryIds: string[];
  ingredientIds: string[];
  name: string;
  cost: number;
  img: string;
}

export interface Category {
  id: string;
  value: ProductTypes;
  icon: string;
}

export interface Ingredient {
  id: string;
  optionName: string;
  optionCal: number;
  //
  cost: number;
}

export interface IngredientSet {
  id: string;
  ingredient: Ingredient;
  amount: number;
  //
  totalPrice: number;
}

export interface IngredientSetDTO {
  amount: number;
  //
  // id: string;
  // ingredientId: string;
  //
  price: number;
  name: string;
}

export interface ProductsState {
  products: Product[];
  categories: Category[];
  ingredients: Ingredient[];
}
