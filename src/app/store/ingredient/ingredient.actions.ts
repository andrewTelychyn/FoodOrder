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
export const removeIngredients = createAction(
  '[Ingredient Component] RemoveIngredients'
);

export const changeIngredient = createAction(
  '[Product Component] AddNewIngredient',
  props<{ ingredient: Ingredient }>()
);

export const deleteIngredient = createAction(
  '[Product Component] DeleteIngredient',
  props<{ id: string }>()
);
