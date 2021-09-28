import {
  Category,
  Ingredient,
  Product,
} from 'src/app/shared/models/product.model';

export interface ProductsState {
  items: Product[];
  loading?: boolean;
  error?: string;
}

export interface IngredientsState {
  items: Ingredient[];
  loading?: boolean;
  error?: string;
}

export interface CategoriesState {
  items: Category[];
  loading?: boolean;
  error?: string;
}

export interface MainState {
  products: ProductsState;
  ingredients: IngredientsState;
  categories: CategoriesState;
}
