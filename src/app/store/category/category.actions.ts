import { createAction, props } from '@ngrx/store';
import { Category } from '../../shared/models/product.model';

export const addCategories = createAction('[Category Component] AddCatogories');
//
export const addCategoriesSuccess = createAction(
  '[Category Component] AddCategoriesSuccess',
  props<{ categories: Category[] }>()
);
export const addCategoriesFail = createAction(
  '[Category Component] AddCategoriesFail',
  props<{ error: string }>()
);
//
//
export const updateCategory = createAction(
  '[Category Component] UpdateCategory',
  props<{ category: Category }>()
);

export const updateCategorySuccess = createAction(
  '[Category Component] UpdateCategorySuccess',
  props<{ category: Category }>()
);

export const updateCategoryFail = createAction(
  '[Category Component] UpdateCategoryFail',
  props<{ error: string }>()
);
//
//
export const addNewCategory = createAction(
  '[Category Component] AddNewCategory',
  props<{ category: Category }>()
);

export const addNewCategorySuccess = createAction(
  '[Category Component] AddNewCategorySuccess',
  props<{ category: Category }>()
);

export const addNewCategoryFail = createAction(
  '[Category Component] AddNewCategoryFail',
  props<{ error: string }>()
);
//
//
export const deleteCategory = createAction(
  '[Category Component] DeleteCategory',
  props<{ id: string }>()
);

export const deleteCategorySuccess = createAction(
  '[Category Component] DeleteCategorySuccess',
  props<{ id: string }>()
);

export const deleteCategoryFail = createAction(
  '[Category Component] DeleteCategoryFail',
  props<{ error: string }>()
);
