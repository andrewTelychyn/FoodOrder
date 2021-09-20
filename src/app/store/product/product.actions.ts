import { createAction, props } from '@ngrx/store';
import {
  Category,
  Ingredient,
  Product,
} from '../../shared/models/product.model';

export const addProducts = createAction(
  '[Product Component] AddProducts',
  props<{ products: Product[] }>()
);
export const removeProducts = createAction(
  '[Product Component] RemoveProducts'
);

export const addCategories = createAction(
  '[Product Component] AddCatogories',
  props<{ categories: Category[] }>()
);
export const removeCatogories = createAction(
  '[Product Component] RemoveCatogories'
);

export const addIngredients = createAction(
  '[Product Component] AddIngredients',
  props<{ ingredients: Ingredient[] }>()
);
export const removeIngredients = createAction(
  '[Product Component] RemoveIngredients'
);

export const reset = createAction('[Product Component] Reset');
