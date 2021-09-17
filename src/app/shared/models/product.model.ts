// export type ProductTypes = 'burger' | 'desert' | 'drink';

export enum ProductTypes {
  burger = 'burger',
  desert = 'desert',
  drink = 'drink',
}

export interface Product {
  id: string;
  type: ProductTypes;
  categoryId: string;
  name: string;
  cost: number;
  img: string;
}

export interface Category {
  id: string;
  value: ProductTypes;
}

export interface ProductOptionDb {
  id: ProductTypes;
  options: ProductOption[];
}

export interface ProductOption {
  optionName: string;
  optionAmount: number;
  optionCal: number;
  id: string;
}
