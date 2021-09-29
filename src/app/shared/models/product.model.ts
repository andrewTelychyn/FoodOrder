export enum ProductTypes {
  burger = 'burger',
  desert = 'desert',
  drink = 'drink',
}

export interface Product {
  type?: string;
  categoryIds: string[];
  ingredientIds: string[];
  cost: number;
  img: string;
  id: string;
  name: string;
}

export interface Category {
  icon: string;
  id: string;
  name: string;
}

export interface Ingredient {
  optionCal: number;
  cost: number;
  id: string;
  name: string;
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
