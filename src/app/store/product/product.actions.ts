import { createAction, props } from '@ngrx/store';
import {
  Category,
  Ingredient,
  Product,
  ProductsState,
} from '../../shared/models/product.model';

export const addProducts = createAction(
  '[Product Component] AddProducts',
  props<{ products: Product[] }>()
);
export const removeProducts = createAction(
  '[Product Component] RemoveProducts'
);

export const changeProduct = createAction(
  '[Product Component] AddNewProduct',
  props<{ product: Product }>()
);

//
//
//
//
//

export const addCategories = createAction(
  '[Category Component] AddCatogories',
  props<{ categories: Category[] }>()
);
export const removeCatogories = createAction(
  '[Category Component] RemoveCatogories'
);

export const changeCategory = createAction(
  '[Product Component] AddNewCategory',
  props<{ category: Category }>()
);

//
//
//
//
//

export const addIngredients = createAction(
  '[Ingredient Component] AddIngredients',
  props<{ ingredients: Ingredient[] }>()
);
export const removeIngredients = createAction(
  '[Ingredient Component] RemoveIngredients'
);

export const changeIngredient = createAction(
  '[Product Component] AddNewCategory',
  props<{ ingredient: Ingredient }>()
);
//
//
//
//
//

export const loadAll = createAction(
  '[All Component] LoadingAll',
  props<ProductsState>()
);

export const reset = createAction('[Product Component] Reset');
