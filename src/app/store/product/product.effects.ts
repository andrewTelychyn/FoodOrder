import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  addProducts,
  addProductsFail,
  addProductsSuccess,
} from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
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
}
