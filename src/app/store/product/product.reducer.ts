import { Action, createReducer, on } from '@ngrx/store';
import * as StoreActions from './product.actions';
import { ProductsState } from '../shared/store.model';

const initialState: ProductsState = {
  items: [],
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
    items: products,
    loading: false,
    error: '',
  })),
  on(StoreActions.addProductsFail, (state: ProductsState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  //
  //
  on(StoreActions.updateProduct, (state: ProductsState, { product }) => ({
    ...state,
    loading: false,
    error: '',
  })),
  on(
    StoreActions.updateProductSuccess,
    (state: ProductsState, { product }) => ({
      ...state,
      items: state.items.map((i) => (i.id == product.id ? product : i)),
      loading: false,
    })
  ),
  on(StoreActions.updateProductFail, (state: ProductsState, { error }) => ({
    ...state,
    error,
  })),
  //
  //
  on(StoreActions.addNewProduct, (state: ProductsState, { product }) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(
    StoreActions.addNewProductSuccess,
    (state: ProductsState, { product }) => ({
      ...state,
      items: [...state.items, product],
      loading: false,
    })
  ),
  on(StoreActions.addNewProductFail, (state: ProductsState, { error }) => ({
    ...state,
    error,
  })),
  //
  //
  on(StoreActions.deleteProduct, (state: ProductsState, { id }) => ({
    ...state,
    loading: true,
  })),
  on(StoreActions.deleteProductSuccess, (state: ProductsState, { id }) => ({
    items: state.items.filter((c) => c.id != id),
    loading: false,
  })),
  on(StoreActions.deleteProductFail, (state: ProductsState, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function productReducer(
  state: ProductsState | undefined,
  action: Action
): ProductsState {
  return _productReducer(state, action);
}
