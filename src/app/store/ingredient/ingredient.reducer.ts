import { Action, createReducer, on } from '@ngrx/store';
import * as StoreActions from './ingredient.actions';
import { IngredientsState } from '../shared/store.model';

const initialState: IngredientsState = {
  items: [],
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
      items: ingredients,
      loading: false,
      error: '',
    })
  ),
  on(StoreActions.addIngredientsFail, (state: IngredientsState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  //
  //
  on(
    StoreActions.updateIngredient,
    (state: IngredientsState, { ingredient }) => ({
      ...state,
      loading: true,
      error: '',
    })
  ),
  on(
    StoreActions.updateIngredientSuccess,
    (state: IngredientsState, { ingredient }) => ({
      ...state,
      items: state.items.map((i) => (i.id == ingredient.id ? ingredient : i)),
      loading: false,
    })
  ),
  on(
    StoreActions.updateIngredientFail,
    (state: IngredientsState, { error }) => ({
      ...state,
      error,
    })
  ),
  //
  //
  on(
    StoreActions.addNewIngredient,
    (state: IngredientsState, { ingredient }) => ({
      ...state,
      loading: true,
      error: '',
    })
  ),
  on(
    StoreActions.addNewIngredientSuccess,
    (state: IngredientsState, { ingredient }) => ({
      ...state,
      items: [...state.items, ingredient],
      loading: false,
    })
  ),
  on(
    StoreActions.addNewIngredientFail,
    (state: IngredientsState, { error }) => ({
      ...state,
      error,
    })
  ),
  //
  //
  on(StoreActions.deleteIngredient, (state: IngredientsState, { id }) => ({
    ...state,
    loading: true,
  })),
  on(
    StoreActions.deleteIngredientSuccess,
    (state: IngredientsState, { id }) => ({
      items: state.items.filter((c) => c.id != id),
      loading: false,
    })
  ),
  on(
    StoreActions.deleteIngredientFail,
    (state: IngredientsState, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);

export function ingredientReducer(
  state: IngredientsState | undefined,
  action: Action
): IngredientsState {
  return _ingredientReducer(state, action);
}
