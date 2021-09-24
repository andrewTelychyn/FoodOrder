import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import {
  Category,
  Ingredient,
  Product,
  ProductsState,
} from 'src/app/shared/models/product.model';
import { changeIngredient } from 'src/app/store/product/product.actions';

@Component({
  selector: 'app-admin-ingredient',
  templateUrl: './admin-ingredient.component.html',
  styleUrls: ['./admin-ingredient.component.scss'],
})
export class AdminIngredientComponent implements OnInit {
  public chosenIngredient: Ingredient;
  public form: FormGroup;

  public store$: Observable<ProductsState>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      ingredient: Ingredient;
    },
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AdminIngredientComponent>,
    private store: Store<{ main: ProductsState }>,
    private adminService: AdminService
  ) {
    this.chosenIngredient = this.data.ingredient;

    this.store$ = this.store.select('main');

    this.form = this.formBuilder.group({
      cost: [data.ingredient.cost, Validators.required],
      name: [data.ingredient.optionName, Validators.required],
      cal: [data.ingredient.optionCal, Validators.required],
    });
  }

  public submit() {
    if (this.form.invalid) return;

    let ingredient: Ingredient = {
      id: this.chosenIngredient.id,
      optionName: this.form.controls.name.value,
      optionCal: Number(this.form.controls.cost.value),
      cost: this.form.controls.cost.value,
    };

    this.store$
      .pipe(
        switchMap((store) => {
          if (store.ingredients.findIndex((p) => p.id == ingredient.id) >= 0) {
            return this.adminService.updateIngredient(ingredient);
          } else {
            return this.adminService.saveNewIngredient(ingredient);
          }
        }),
        take(1)
      )
      .subscribe((data) => {
        this.store.dispatch(changeIngredient({ ingredient }));
        this.dialog.close();
      });
  }

  public close() {
    this.dialog.close();
  }

  ngOnInit(): void {}
}
