import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  addIngredients,
  addIngredientsSuccess,
  addIngredientsFail,
} from './ingredient.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class IngredientEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  $loadProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(addIngredients),
      mergeMap(() =>
        this.productService
          .getAllIngredients()
          .pipe(map((ingredients) => addIngredientsSuccess({ ingredients })))
      ),
      catchError((error) => of(addIngredientsFail({ error })))
    )
  );
}
