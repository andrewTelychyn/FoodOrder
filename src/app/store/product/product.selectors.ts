import { createSelector } from '@ngrx/store';
import {
  Category,
  Ingredient,
  IngredientSet,
  Product,
  ProductsState,
} from 'src/app/shared/models/product.model';

// const selectAllCategories = (state: ProductsState) => state.categories;
const selectAllCategories = (state: ProductsState) => state.categories;

const selectAllProducts = (state: ProductsState) => state.products;

const selectAllIngredients = (state: ProductsState) => state.ingredients;

// const selectAllIngredientSets = (state: ProductsState) => state.ingredientSets;

export const selectChosenCategory = createSelector(
  selectAllCategories,
  (allCategories: Category[], url: string) => {
    return allCategories.find((i) => i.value === url) || allCategories[0];
  }
);

export const getProductsByCategory = createSelector(
  selectAllProducts,
  (allProducts: Product[], categoryId: string) => {
    return allProducts.filter((i) => i.categoryIds.includes(categoryId));
  }
);

export const getProductIngredients = createSelector(
  selectAllIngredients,
  (allIngredients: Ingredient[], product: Product) =>
    allIngredients
      .filter((i) => product.ingredientIds.includes(i.id))
      .map((elem, idx) => ({
        ingredient: elem,
        amount: 0,
        id: String(Date.now()),
      }))
);

// ingredientSets: ingredients.map((elem, idx) => ({
//   ingredient: elem,
//   amount: 0,
//   id: 'ingredientset' + idx + 1,
// })),
