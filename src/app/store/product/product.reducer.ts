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
  on(StoreActions.changeProduct, (state: ProductsState, { product }) => ({
    ...state,
    products:
      state.products.findIndex((p) => p.id == product.id) >= 0
        ? state.products.map((p) => (p.id == product.id ? product : p))
        : [...state.products, product],
  })),
  // on(StoreActions.updateProduct, (state: ProductsState, { product }) => ({
  //   ...state,
  //   products: state.products.map((p) => (p.id == product.id ? product : p)),
  // })),
  on(StoreActions.addIngredients, (state: ProductsState, { ingredients }) => ({
    ...state,
    ingredients,
  })),
  on(StoreActions.removeIngredients, (state) => ({ ...state, products: [] })),
  on(StoreActions.changeIngredient, (state: ProductsState, { ingredient }) => ({
    ...state,
    ingredients:
      state.ingredients.findIndex((p) => p.id == ingredient.id) >= 0
        ? state.ingredients.map((p) => (p.id == ingredient.id ? ingredient : p))
        : [...state.ingredients, ingredient],
  })),
  //
  on(StoreActions.addCategories, (state: ProductsState, { categories }) => ({
    ...state,
    categories,
  })),
  on(StoreActions.removeCatogories, (state) => ({ ...state, products: [] })),
  on(StoreActions.changeCategory, (state: ProductsState, { category }) => ({
    ...state,
    categories:
      state.categories.findIndex((p) => p.id == category.id) >= 0
        ? state.categories.map((p) => (p.id == category.id ? category : p))
        : [...state.categories, category],
  })),
  //
  on(
    StoreActions.loadAll,
    (state: ProductsState, newState: ProductsState) => newState
  ),
  on(StoreActions.reset, (state) => initialState)
);

export function productReducer(
  state: ProductsState | undefined,
  action: Action
): ProductsState {
  return _productReducer(state, action);
}
