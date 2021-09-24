import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Category,
  Ingredient,
  Product,
  ProductsState,
  ProductTypes,
} from 'src/app/shared/models/product.model';
import { v4 as uuid } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { AdminProductComponent } from 'src/app/components/admin-modal-dialog/admin-product/admin-product.component';
import { AdminIngredientComponent } from 'src/app/components/admin-modal-dialog/admin-ingredient/admin-ingredient.component';
import { AdminCategoryComponent } from 'src/app/components/admin-modal-dialog/admin-category/admin-category.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  public store$: Observable<ProductsState>;

  public chosenCategory: Category | undefined;

  constructor(
    private store: Store<{ main: ProductsState }>,
    private matDialog: MatDialog
  ) {
    this.store$ = store.select('main');
  }

  public chooseProduct(item: Product) {
    this.matDialog.open(AdminProductComponent, { data: { product: item } });
  }

  public chooseIngredient(ingredient: Ingredient) {
    this.matDialog.open(AdminIngredientComponent, { data: { ingredient } });
  }

  public chooseCategory(category: Category) {
    this.matDialog.open(AdminCategoryComponent, { data: { category } });
  }

  public createNewProduct() {
    let value: Product = {
      name: '',
      img: '',
      cost: 0,
      ingredientIds: [],
      categoryIds: [],
      id: uuid(),
    } as Product;

    this.matDialog.open(AdminProductComponent, {
      data: { product: value },
    });
  }

  public createNewIngredient() {
    let value: Ingredient = {
      optionCal: 0,
      optionName: '',
      cost: 0,
      id: uuid(),
    } as Ingredient;

    this.matDialog.open(AdminIngredientComponent, {
      data: { ingredient: value },
    });
  }

  public createNewCategory() {
    let value: Category = {
      value: ProductTypes.burger,
      icon: '',
      id: uuid(),
    };

    this.matDialog.open(AdminCategoryComponent, {
      data: { category: value },
    });
  }

  public submit() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
