import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  Category,
  Ingredient,
  Product,
  ProductsState,
} from 'src/app/shared/models/product.model';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { AdminService } from 'src/app/services/ingredients.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  public store$: Observable<ProductsState>;

  public product$: BehaviorSubject<Product | undefined>;

  public chosenProduct: Product | undefined;
  public chosenCategory: Category | undefined;
  public chosenIngredient: Ingredient | undefined;

  public subscription: Subscription;
  public form: FormGroup;

  constructor(
    private store: Store<{ main: ProductsState }>,
    private formBuiler: FormBuilder,
    private adminService: AdminService
  ) {
    this.store$ = store.select('main');

    this.form = this.formBuiler.group({
      categories: [[], Validators.required],
      ingredients: [[], Validators.required],
      name: ['', Validators.required],
      image: ['', Validators.required],
      cost: [0, Validators.required],
    });

    this.product$ = new BehaviorSubject<Product | undefined>(undefined);

    this.subscription = this.product$
      .pipe(
        filter((i) => i != undefined),
        tap((p) => (this.chosenProduct = p)),
        switchMap((p) =>
          this.store$.pipe(
            map((s) => ({
              ingredients: s.ingredients,
              categories: s.categories,
            })),
            tap((obj) => {
              this.form.controls.ingredients.setValue(
                obj.ingredients
                  .filter((i) => p?.ingredientIds.includes(i.id))
                  .map((i) => i.optionName)
                  .join(', ')
              );

              this.form.controls.categories.setValue(
                obj.categories
                  .filter((i) => p?.categoryIds.includes(i.id))
                  .map((i) => i.value)
                  .join(', ')
              );
              this.form.controls.image.setValue(p?.img);
              this.form.controls.name.setValue(p?.name);
              this.form.controls.cost.setValue(p?.cost);
            })
          )
        )
      )
      .subscribe((data) => {});
  }

  public chooseProduct(item: Product) {
    if (item.id == this.chosenProduct?.id) {
      this.chosenProduct = undefined;
      return;
    }

    this.chosenProduct = Object.assign({}, item, { selected: false });
    this.product$.next(item);
  }

  public clickOnIngredient(ingredient: Ingredient) {
    if (this.chosenProduct) {
      let value: Product = Object.assign(
        Object.assign({}, this.chosenProduct, {
          selected: false,
        }),
        {
          name: this.form.controls.name.value,
          img: this.form.controls.image.value,
          cost: this.form.controls.cost.value,
        }
      );

      if (value.ingredientIds.includes(ingredient.id)) {
        value.ingredientIds = value.ingredientIds.filter(
          (i) => i !== ingredient.id
        );
      } else value.ingredientIds = value.ingredientIds.concat(ingredient.id);

      this.product$.next(value);
    }
  }

  public clickOnCategory(category: Category) {
    if (this.chosenProduct) {
      let value: Product = Object.assign(
        Object.assign({}, this.chosenProduct, {
          selected: false,
        }),
        {
          name: this.form.controls.name.value,
          img: this.form.controls.image.value,
          cost: this.form.controls.cost.value,
        }
      );

      if (value.categoryIds.includes(category.id)) {
        value.categoryIds = value.categoryIds.filter((i) => i !== category.id);
      } else value.categoryIds = value.categoryIds.concat(category.id);

      this.product$.next(value);
    }
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

    this.chosenProduct = value;
    this.product$.next(value);
  }

  public submit() {
    let product: Product = this.product$.getValue()!;

    if (this.form.invalid) return;

    this.store$
      .pipe(
        switchMap((store) => {
          if (store.products.includes(product)) {
            return this.adminService.updateProduct(product);
          } else {
            return this.adminService.saveNewProduct(product);
          }
        }),
        take(1)
      )
      .subscribe((data) => console.log(data));
  }

  ngOnInit(): void {}

  ngOnDestroy() {}
}
