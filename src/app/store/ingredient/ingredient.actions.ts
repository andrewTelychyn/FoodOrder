import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/models/product.model';

export const addIngredients = createAction(
  '[Ingredient Component] AddIngredients'
);
//
export const addIngredientsSuccess = createAction(
  '[Product Component] AddIngredientsSuccess',
  props<{ ingredients: Ingredient[] }>()
);
export const addIngredientsFail = createAction(
  '[Product Component] AddIngredientsFail',
  props<{ error: string }>()
);
//
//
export const updateIngredient = createAction(
  '[Ingredient Component] UpdateIngredient',
  props<{ ingredient: Ingredient }>()
);

export const updateIngredientSuccess = createAction(
  '[Ingredient Component] UpdateIngredientSuccess',
  props<{ ingredient: Ingredient }>()
);

export const updateIngredientFail = createAction(
  '[Ingredient Component] UpdateIngredientFail',
  props<{ error: string }>()
);
//
//
export const addNewIngredient = createAction(
  '[Ingredient Component] AddNewIngredient',
  props<{ ingredient: Ingredient }>()
);

export const addNewIngredientSuccess = createAction(
  '[Ingredient Component] AddNewIngredientSuccess',
  props<{ ingredient: Ingredient }>()
);

export const addNewIngredientFail = createAction(
  '[Ingredient Component] AddNewIngredientFail',
  props<{ error: string }>()
);
//
//
export const deleteIngredient = createAction(
  '[Ingredient Component] DeleteIngredient',
  props<{ id: string }>()
);

export const deleteIngredientSuccess = createAction(
  '[Ingredient Component] DeleteIngredientSuccess',
  props<{ id: string }>()
);

export const deleteIngredientFail = createAction(
  '[Ingredient Component] DeleteIngredientFail',
  props<{ error: string }>()
);
