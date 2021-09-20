// export type ProductTypes = 'burger' | 'desert' | 'drink';

export enum ProductTypes {
  burger = 'burger',
  desert = 'desert',
  drink = 'drink',
}

export interface Product {
  id: string;
  type: ProductTypes;
  categoryIds: string[];
  ingredientIds: string[];
  name: string;
  cost: number;
  img: string;
}

export interface Category {
  id: string;
  value: ProductTypes;
}

export interface Ingredient {
  optionName: string;
  optionAmount: number;
  optionCal: number;
  categoryIds: string[];
  id: string;
}

export interface ProductsState {
  products: Product[];
  categories: Category[];
  ingredients: Ingredient[];
}
