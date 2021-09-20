import { createAction, props } from '@ngrx/store';
import { Category } from '../../shared/models/product.model';

export const addCategories = createAction(
  '[Product Component] AddCatogories',
  props<{ categories: Category[] }>()
);
export const removeCatogories = createAction(
  '[Product Component] RemoveCatogories'
);
