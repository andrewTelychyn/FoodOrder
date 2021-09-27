import { createAction, props } from '@ngrx/store';
import { Category } from '../../shared/models/product.model';

export const addCategories = createAction('[Category Component] AddCatogories');
//
export const addCategoriesSuccess = createAction(
  '[Product Component] AddCategoriesSuccess',
  props<{ categories: Category[] }>()
);
export const addCategoriesFail = createAction(
  '[Product Component] AddCategoriesFail',
  props<{ error: string }>()
);
//
export const removeCatogories = createAction(
  '[Category Component] RemoveCatogories'
);

export const changeCategory = createAction(
  '[Product Component] AddNewCategory',
  props<{ category: Category }>()
);

export const deleteCategory = createAction(
  '[Product Component] DeleteCategory',
  props<{ id: string }>()
);
