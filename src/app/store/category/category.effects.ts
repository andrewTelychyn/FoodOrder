import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  addCategories,
  addCategoriesFail,
  addCategoriesSuccess,
  addNewCategory,
  addNewCategoryFail,
  addNewCategorySuccess,
  deleteCategory,
  deleteCategoryFail,
  deleteCategorySuccess,
  updateCategory,
  updateCategoryFail,
  updateCategorySuccess,
} from './category.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private adminService: AdminService
  ) {}

  $loadCategories = createEffect(() =>
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

  $updateCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategory),
      mergeMap(({ category }) =>
        this.adminService
          .updateCategory(category)
          .pipe(map((updated) => updateCategorySuccess({ category: updated })))
      ),
      catchError((error) => of(updateCategoryFail({ error })))
    )
  );

  $addNewCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewCategory),
      mergeMap(({ category }) =>
        this.adminService
          .saveNewCategory(category)
          .pipe(
            map((newCategory) =>
              addNewCategorySuccess({ category: newCategory })
            )
          )
      ),
      catchError((error) => of(addNewCategoryFail({ error })))
    )
  );

  $deleteCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategory),
      mergeMap((category) =>
        this.adminService
          .deleteCategory(category.id)
          .pipe(map((i) => deleteCategorySuccess({ id: category.id })))
      ),
      catchError((error) => of(deleteCategoryFail({ error })))
    )
  );
}
