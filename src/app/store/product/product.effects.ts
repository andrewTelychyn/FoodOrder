import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  addProducts,
  addProductsFail,
  addProductsSuccess,
  updateProduct,
  updateProductFail,
  updateProductSuccess,
  addNewProduct,
  addNewProductFail,
  addNewProductSuccess,
  deleteProduct,
  deleteProductFail,
  deleteProductSuccess,
} from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private adminSerive: AdminService
  ) {}

  $loadProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(addProducts),
      mergeMap(() =>
        this.productService
          .getAllProducts()
          .pipe(map((products) => addProductsSuccess({ products })))
      ),
      catchError((error) => of(addProductsFail({ error })))
    )
  );

  $updateCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      mergeMap(({ product }) =>
        this.adminSerive
          .updateProduct(product)
          .pipe(map((updated) => updateProductSuccess({ product: updated })))
      ),
      catchError((error) => of(updateProductFail({ error })))
    )
  );

  $addNewCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewProduct),
      mergeMap(({ product }) =>
        this.adminSerive
          .saveNewProduct(product)
          .pipe(map((updated) => addNewProductSuccess({ product: updated })))
      ),
      catchError((error) => of(addNewProductFail({ error })))
    )
  );

  $deleteCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap((product) =>
        this.adminSerive
          .deleteProduct(product.id)
          .pipe(map((i) => deleteProductSuccess({ id: product.id })))
      ),
      catchError((error) => of(deleteProductFail({ error })))
    )
  );
}
