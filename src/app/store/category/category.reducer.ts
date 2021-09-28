import { Action, createReducer, on } from '@ngrx/store';
import { CategoriesState } from '../shared/store.model';
import * as StoreActions from './category.actions';

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: '',
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
      items: categories,
      loading: false,
      error: '',
    })
  ),
  on(StoreActions.addCategoriesFail, (state: CategoriesState, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  //
  //
  on(StoreActions.updateCategory, (state: CategoriesState, { category }) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(
    StoreActions.updateCategorySuccess,
    (state: CategoriesState, { category }) => ({
      ...state,
      items: state.items.map((i) => (i.id == category.id ? category : i)),
      loading: false,
    })
  ),
  on(StoreActions.updateCategoryFail, (state: CategoriesState, { error }) => ({
    ...state,
    error,
  })),
  //
  //
  on(StoreActions.addNewCategory, (state: CategoriesState, { category }) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(
    StoreActions.addNewCategorySuccess,
    (state: CategoriesState, { category }) => ({
      ...state,
      items: [...state.items, category],
      loading: false,
    })
  ),
  on(StoreActions.addNewCategoryFail, (state: CategoriesState, { error }) => ({
    ...state,
    error,
  })),
  //
  //
  on(StoreActions.deleteCategory, (state: CategoriesState, { id }) => ({
    ...state,
    loading: true,
  })),
  on(StoreActions.deleteCategorySuccess, (state: CategoriesState, { id }) => ({
    items: state.items.filter((c) => c.id != id),
    loading: false,
  })),
  on(StoreActions.deleteCategoryFail, (state: CategoriesState, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function categoryReducer(
  state: CategoriesState | undefined,
  action: Action
): CategoriesState {
  return _categoryReducer(state, action);
}
