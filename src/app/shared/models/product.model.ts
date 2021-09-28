// export type ProductTypes = 'burger' | 'desert' | 'drink';

export enum ProductTypes {
  burger = 'burger',
  desert = 'desert',
  drink = 'drink',
}

export interface MainType {
  id: string;
  name: string;
}

export interface Product extends MainType {
  type?: string;
  categoryIds: string[];
  ingredientIds: string[];
  cost: number;
  img: string;
}

export interface Category extends MainType {
  icon: string;
}

export interface Ingredient extends MainType {
  optionCal: number;
  cost: number;
}

export interface IngredientSet {
  id: string;
  ingredient: Ingredient;
  amount: number;
  totalPrice: number;
}

export interface IngredientSetDTO {
  amount: number;
  price: number;
  name: string;
}
