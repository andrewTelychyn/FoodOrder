import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  addIngredients,
  addIngredientsSuccess,
  addIngredientsFail,
  updateIngredient,
  updateIngredientSuccess,
  updateIngredientFail,
  addNewIngredient,
  addNewIngredientFail,
  addNewIngredientSuccess,
  deleteIngredient,
  deleteIngredientFail,
  deleteIngredientSuccess,
} from './ingredient.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Injectable()
export class IngredientEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private adminSerivce: AdminService
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

  $updateIngredients = createEffect(() =>
    this.actions$.pipe(
      ofType(updateIngredient),
      mergeMap(({ ingredient }) =>
        this.adminSerivce
          .updateIngredient(ingredient)
          .pipe(
            map((updated) => updateIngredientSuccess({ ingredient: updated }))
          )
      ),
      catchError((error) => of(updateIngredientFail({ error })))
    )
  );

  $addNewIngredients = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewIngredient),
      mergeMap(({ ingredient }) =>
        this.adminSerivce
          .saveNewIngredient(ingredient)
          .pipe(
            map((newIngredient) =>
              addNewIngredientSuccess({ ingredient: newIngredient })
            )
          )
      ),
      catchError((error) => of(addNewIngredientFail({ error })))
    )
  );

  $deleteIngredient = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteIngredient),
      mergeMap((ingredient) =>
        this.adminSerivce
          .deleteIngredient(ingredient.id)
          .pipe(map((i) => deleteIngredientSuccess({ id: ingredient.id })))
      ),
      catchError((error) => of(deleteIngredientFail({ error })))
    )
  );
}
