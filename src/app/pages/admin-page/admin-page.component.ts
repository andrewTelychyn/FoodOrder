import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Category,
  Ingredient,
  Product,
  ProductsState,
} from 'src/app/shared/models/product.model';

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

  chooseProduct(item: Product) {
    this.form.controls.categories.setValue(item.categoryIds.join(', '));
    this.form.controls.ingredients.setValue(item.ingredientIds.join(', '));
    this.chosenProduct = item;
    console.log(this.f.categories.value);
  }

  ngOnInit(): void {}
}
