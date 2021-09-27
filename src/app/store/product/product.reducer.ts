import { Action, createReducer, on } from '@ngrx/store';
import * as StoreActions from './product.actions';
import { ProductsState } from '../shared/store.model';
import { addOrUpdate } from '../shared/store.func';
import { Product } from 'src/app/shared/models/product.model';

const initialState: ProductsState = {
  products: [],
  error: '',
  loading: false,
};

const _productReducer = createReducer(
  initialState,
  on(StoreActions.addProducts, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(StoreActions.addProductsSuccess, (state: ProductsState, { products }) => ({
    products,
    loading: false,
    error: '',
  })),
  on(StoreActions.addProductsFail, (state: ProductsState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(StoreActions.removeProducts, (state) => ({ ...state, products: [] })),
  on(StoreActions.changeProduct, (state: ProductsState, { product }) => ({
    ...state,
    products: addOrUpdate(state.products, product),
  })),
  on(StoreActions.deleteProduct, (state: ProductsState, { id }) => ({
    ...state,
    products: state.products.filter((p) => p.id != id),
  })),
  on(StoreActions.reset, (state) => initialState)
);

export function productReducer(
  state: ProductsState | undefined,
  action: Action
): ProductsState {
  return _productReducer(state, action);
}
