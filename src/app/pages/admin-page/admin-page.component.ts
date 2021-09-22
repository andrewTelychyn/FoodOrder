import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Category,
  Ingredient,
  Product,
  ProductsState,
} from 'src/app/shared/models/product.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  public store$: Observable<{ main: ProductsState }>;

  public chosenProduct: Product | undefined;
  public chosenCategory: Category | undefined;
  public chosenIngredient: Ingredient | undefined;

  public form: FormGroup;

  get f() {
    return this.form.controls;
  }

  constructor(
    private store: Store<{ main: ProductsState }>,
    private formBuiler: FormBuilder
  ) {
    this.store$ = store;

    this.form = this.formBuiler.group({
      categories: [[], Validators.required],
      ingredients: [[], Validators.required],
    });
  }

  public chooseProduct(item: Product) {
    if (item.id == this.chosenProduct?.id) {
      this.chosenProduct = undefined;
      return;
    }

    this.chosenProduct = Object.assign({}, item, { selected: false });

    this.store$.subscribe((data) => {
      console.log('hello');
      this.form.controls.ingredients.setValue(
        data.main.ingredients
          .filter((i) => this.chosenProduct?.ingredientIds.includes(i.id))
          .map((i) => i.optionName)
          .join(', ')
      );
      this.form.controls.categories.setValue(
        data.main.categories
          .filter((i) => this.chosenProduct?.categoryIds.includes(i.id))
          .map((i) => i.value)
          .join(', ')
      );
    });
  }

  public clickOnIngredient(ingredient: Ingredient) {
    if (this.chosenProduct) {
      if (this.chosenProduct.ingredientIds.includes(ingredient.id)) {
        this.chosenProduct.ingredientIds =
          this.chosenProduct.ingredientIds.filter((i) => i !== ingredient.id);
      } else
        this.chosenProduct.ingredientIds =
          this.chosenProduct.ingredientIds.concat(ingredient.id);
    }
  }

  public clickOnCategory(category: Category) {
    if (this.chosenProduct) {
      if (this.chosenProduct.categoryIds.includes(category.id))
        this.chosenProduct.categoryIds = this.chosenProduct.categoryIds.filter(
          (i) => i !== category.id
        );
      else
        this.chosenProduct.categoryIds = this.chosenProduct.categoryIds.concat(
          category.id
        );
    }
  }

  ngOnInit(): void {}
}
