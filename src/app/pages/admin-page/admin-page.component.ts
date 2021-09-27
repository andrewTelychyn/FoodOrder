import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Category,
  Ingredient,
  Product,
  ProductTypes,
} from 'src/app/shared/models/product.model';
import { v4 as uuid } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { AdminProductComponent } from 'src/app/components/admin-modal-dialog/admin-product/admin-product.component';
import { AdminIngredientComponent } from 'src/app/components/admin-modal-dialog/admin-ingredient/admin-ingredient.component';
import { AdminCategoryComponent } from 'src/app/components/admin-modal-dialog/admin-category/admin-category.component';
import { MainState } from 'src/app/store/shared/store.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  public store$: Observable<MainState>;

  public isProductsOpen = true;
  public isIngredientsOpen = true;
  public isCategoriesOpen = true;

  constructor(
    private matDialog: MatDialog,
    private store: Store<{ main: MainState }>
  ) {
    this.store$ = this.store.select('main');
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

  public openCloseIng() {
    this.isIngredientsOpen = !this.isIngredientsOpen;
  }

  public openCloseProd() {
    this.isProductsOpen = !this.isProductsOpen;
  }

  public openCloseCat() {
    this.isCategoriesOpen = !this.isCategoriesOpen;
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
