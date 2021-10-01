import { createSelector } from '@ngrx/store';
import {
  Category,
  Ingredient,
  IngredientSet,
  Product,
} from 'src/app/shared/models/product.model';
import { v4 as getid } from 'uuid';
import { MainState } from './shared/store.model';

const selectAllCategories = (state: MainState) => state.categories.items;

const selectAllProducts = (state: MainState) => state.products.items;

const selectAllIngredients = (state: MainState) => state.ingredients.items;

export const selectChosenCategory = createSelector(
  selectAllCategories,
  (allCategories: Category[], url: string) => {
    return allCategories.find((i) => i.name === url) || allCategories[0];
  }
);

export const getProductsByCategory = createSelector(
  selectAllProducts,
  (allProducts: Product[], categoryId: string): Product[] => {
    return allProducts.filter((i) => i.categoryIds.includes(categoryId));
  }
);

export const getProductIngredients = createSelector(
  selectAllIngredients,
  (allIngredients: Ingredient[], product: Product) =>
    allIngredients
      .filter((i) => product.ingredientIds.includes(i.id))
      .map(
        (elem) =>
          ({
            ingredient: elem,
            amount: 0,
            id: getid(),
            totalPrice: 0,
          } as IngredientSet)
      )
);

export const isCategoryNew = createSelector(
  selectAllCategories,
  (allCategories: Category[], id: string) =>
    allCategories.findIndex((c) => c.id == id) < 0
);

export const isProductNew = createSelector(
  selectAllProducts,
  (allProducts: Product[], id: string) =>
    allProducts.findIndex((c) => c.id == id) < 0
);

export const isIngredientNew = createSelector(
  selectAllIngredients,
  (allIngredients: Ingredient[], id: string) =>
    allIngredients.findIndex((c) => c.id == id) < 0
);
