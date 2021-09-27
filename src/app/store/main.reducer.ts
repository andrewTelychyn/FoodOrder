import { combineReducers } from '@ngrx/store';
import { categoryReducer } from './category/category.reducer';
import { ingredientReducer } from './ingredient/ingredient.reducer';
import { productReducer } from './product/product.reducer';

export const reducer = combineReducers({
  products: productReducer,
  ingredients: ingredientReducer,
  categories: categoryReducer,
});
