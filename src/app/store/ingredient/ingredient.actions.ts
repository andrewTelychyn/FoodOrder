import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/models/product.model';

export const addIngredients = createAction(
  '[Product Component] AddIngredients',
  props<{ ingredients: Ingredient[] }>()
);
export const removeIngredients = createAction(
  '[Product Component] RemoveIngredients'
);
