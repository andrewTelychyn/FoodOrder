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
export const removeProducts = createAction(
  '[Product Component] RemoveProducts'
);

export const changeProduct = createAction(
  '[Product Component] AddNewProduct',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product Component] DeleteProduct',
  props<{ id: string }>()
);

//
//
//

// export const loadAll = createAction(
//   '[All Component] LoadingAll',
//   props<ProductsState>()
// );

export const reset = createAction('[Product Component] Reset');
