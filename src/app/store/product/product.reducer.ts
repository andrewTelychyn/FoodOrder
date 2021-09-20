import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as StoreActions from './product.actions';
import { ProductsState } from '../../shared/models/product.model';

// const _productReducer = createReducer(
//   [],
//   on(addProducts, (state: Product[], { products }) => ([...state, products])),
//   on(removeProducts, (state) => ({ ...state, products: [] })),
// );

// export function productReducer(
//   state: Product[] | undefined,
//   action: Action
// ): Product[] {
//   return _productReducer(state, action);
// }

export const initialState: ProductsState = {
  products: [],
  ingredients: [],
  categories: [],
};

const _productReducer = createReducer(
  initialState,
  on(StoreActions.addProducts, (state: ProductsState, { products }) => ({
    ...state,
    products,
  })),
  on(StoreActions.removeProducts, (state) => ({ ...state, products: [] })),
  on(StoreActions.addIngredients, (state: ProductsState, { ingredients }) => ({
    ...state,
    ingredients,
  })),
  on(StoreActions.removeIngredients, (state) => ({ ...state, products: [] })),
  on(StoreActions.addCategories, (state: ProductsState, { categories }) => ({
    ...state,
    categories,
  })),
  on(StoreActions.removeCatogories, (state) => ({ ...state, products: [] })),
  on(StoreActions.reset, (state) => initialState)
);

export function productReducer(
  state: ProductsState | undefined,
  action: Action
): ProductsState {
  return _productReducer(state, action);
}
