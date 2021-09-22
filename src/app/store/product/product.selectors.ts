import { createSelector } from '@ngrx/store';
import {
  BasketOrder,
  BasketOrderDTO,
} from 'src/app/shared/models/basket.model';
import {
  Category,
  Ingredient,
  IngredientSet,
  IngredientSetDTO,
  Product,
  ProductsState,
} from 'src/app/shared/models/product.model';
import { v4 as getid } from 'uuid';

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
          } as IngredientSet)
      )
);

// export const convertIngredientSetDTO = createSelector(
//   selectAllIngredients,
//   (
//     allIngredient: Ingredient[],
//     ingredientsets: IngredientSetDTO[]
//   ): IngredientSet[] => {
//     console.log(ingredientsets, 'wow');

//     return ingredientsets.map(
//       (i) =>
//         ({
//           id: i.id,
//           amount: i.amount,
//           ingredient: allIngredient.find((el) => el.id == i.ingredientId),
//         } as IngredientSet)
//     );
//   }
// );

// export const convertBasketOrderDTO = createSelector(
//   selectAllProducts,
//   (
//     allProducts: Product[],
//     prop: { basketOrder: BasketOrderDTO; ingredientsets: IngredientSet[] }
//   ): BasketOrder =>
//     ({
//       id: prop.basketOrder.id,
//       amount: prop.basketOrder.amount,
//       options: prop.ingredientsets,
//       product: allProducts.find((el) => el.id == prop.basketOrder.productId),
//     } as BasketOrder)
// );
