import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/shared/models/product.model';
import { addOrUpdate } from '../shared/store.func';
import { CategoriesState } from '../shared/store.model';
import * as StoreActions from './category.actions';

const initialState: CategoriesState = {
  categories: [],
};

const _categoryReducer = createReducer(
  initialState,
  on(StoreActions.addCategories, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(
    StoreActions.addCategoriesSuccess,
    (state: CategoriesState, { categories }) => ({
      categories,
      loading: false,
      error: '',
    })
  ),
  on(StoreActions.addCategoriesFail, (state: CategoriesState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(StoreActions.removeCatogories, (state) => ({ categories: [] })),
  on(StoreActions.changeCategory, (state: CategoriesState, { category }) => ({
    categories: addOrUpdate(state.categories, category),
  })),
  on(StoreActions.deleteCategory, (state: CategoriesState, { id }) => ({
    categories: state.categories.filter((c) => c.id != id),
  }))
);

export function categoryReducer(
  state: CategoriesState | undefined,
  action: Action
): CategoriesState {
  return _categoryReducer(state, action);
}
