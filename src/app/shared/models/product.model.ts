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
  id: string;
  optionName: string;
  optionCal: number;
  // optionAmount: number;
  // categoryIds: string[];
}

export interface IngredientSet {
  id: string;
  ingredient: Ingredient;
  amount: number;
}

export interface IngredientSetDTO {
  id: string;
  ingredientId: string;
  amount: number;
}

export interface ProductsState {
  products: Product[];
  categories: Category[];
  ingredients: Ingredient[];
}
