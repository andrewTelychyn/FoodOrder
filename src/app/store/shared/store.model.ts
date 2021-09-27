import {
  Category,
  Ingredient,
  Product,
} from 'src/app/shared/models/product.model';

export interface ProductsState {
  products: Product[];
  loading?: boolean;
  error?: string;
}

export interface IngredientsState {
  ingredients: Ingredient[];
  loading?: boolean;
  error?: string;
}

export interface CategoriesState {
  categories: Category[];
  loading?: boolean;
  error?: string;
}

export interface MainState {
  products: ProductsState;
  ingredients: IngredientsState;
  categories: CategoriesState;
}
