import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  addCategories,
  addCategoriesFail,
  addCategoriesSuccess,
} from './category.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  $loadProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(addCategories),
      mergeMap(() =>
        this.productService
          .getAllCategories()
          .pipe(map((categories) => addCategoriesSuccess({ categories })))
      ),
      catchError((error) => of(addCategoriesFail({ error })))
    )
  );
}
