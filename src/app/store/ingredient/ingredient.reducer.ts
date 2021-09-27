import { Action, createReducer, on } from '@ngrx/store';
import * as StoreActions from './ingredient.actions';
import { IngredientsState } from '../shared/store.model';
import { addOrUpdate } from '../shared/store.func';

const initialState: IngredientsState = {
  ingredients: [],
};

const _ingredientReducer = createReducer(
  initialState,
  on(StoreActions.addIngredients, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(
    StoreActions.addIngredientsSuccess,
    (state: IngredientsState, { ingredients }) => ({
      ingredients,
      loading: false,
      error: '',
    })
  ),
  on(StoreActions.addIngredientsFail, (state: IngredientsState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(StoreActions.removeIngredients, (state) => ({ ingredients: [] })),
  on(
    StoreActions.changeIngredient,
    (state: IngredientsState, { ingredient }) => ({
      ingredients: addOrUpdate(state.ingredients, ingredient),
    })
  ),
  on(StoreActions.deleteIngredient, (state: IngredientsState, { id }) => ({
    ingredients: state.ingredients.filter((i) => i.id != id),
  }))
);

export function ingredientReducer(
  state: IngredientsState | undefined,
  action: Action
): IngredientsState {
  return _ingredientReducer(state, action);
}
