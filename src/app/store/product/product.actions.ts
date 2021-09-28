import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/models/product.model';

export const addProducts = createAction('[Product Component] AddProducts');
//
export const addProductsSuccess = createAction(
  '[Product Component] AddProductsSuccess',
  props<{ products: Product[] }>()
);
export const addProductsFail = createAction(
  '[Product Component] AddProductsFail',
  props<{ error: string }>()
);
//
//
//
export const updateProduct = createAction(
  '[Product Component] UpdateProduct',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product Component] UpdateProductSuccess',
  props<{ product: Product }>()
);

export const updateProductFail = createAction(
  '[Product Component] UpdateProductFail',
  props<{ error: string }>()
);
//
//
export const addNewProduct = createAction(
  '[Product Component] AddNewProduct',
  props<{ product: Product }>()
);

export const addNewProductSuccess = createAction(
  '[Product Component] AddNewProductSuccess',
  props<{ product: Product }>()
);

export const addNewProductFail = createAction(
  '[Product Component] AddNewProductFail',
  props<{ error: string }>()
);
//
//
export const deleteProduct = createAction(
  '[Product Component] DeleteProduct',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product Component] DeleteProductSuccess',
  props<{ id: string }>()
);

export const deleteProductFail = createAction(
  '[Product Component] DeleteProductFail',
  props<{ error: string }>()
);

export const reset = createAction('[Product Component] Reset');
