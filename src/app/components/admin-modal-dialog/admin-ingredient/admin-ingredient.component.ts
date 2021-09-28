import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Ingredient } from 'src/app/shared/models/product.model';
import {
  addNewIngredient,
  deleteIngredient,
  updateIngredient,
} from 'src/app/store/ingredient/ingredient.actions';
import { isIngredientNew } from 'src/app/store/main.selectors';
import { MainState } from 'src/app/store/shared/store.model';

@Component({
  selector: 'app-admin-ingredient',
  templateUrl: './admin-ingredient.component.html',
  styleUrls: ['./admin-ingredient.component.scss'],
})
export class AdminIngredientComponent implements OnInit {
  public chosenIngredient: Ingredient;
  public form: FormGroup;

  public store$: Observable<MainState>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      ingredient: Ingredient;
    },
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AdminIngredientComponent>,
    private store: Store<{ main: MainState }>
  ) {
    this.chosenIngredient = this.data.ingredient;

    this.store$ = this.store.select('main');

    this.form = this.formBuilder.group({
      cost: [data.ingredient.cost, Validators.required],
      name: [data.ingredient.name, Validators.required],
      cal: [data.ingredient.optionCal, Validators.required],
    });
  }

  public submit() {
    if (this.form.invalid) return;

    let ingredient: Ingredient = {
      id: this.chosenIngredient.id,
      name: this.form.controls.name.value,
      optionCal: Number(this.form.controls.cal.value),
      cost: Number(this.form.controls.cost.value),
    };

    this.store$
      .pipe(select(isIngredientNew, this.chosenIngredient.id), take(1))
      .subscribe((bool) =>
        bool
          ? this.store.dispatch(addNewIngredient({ ingredient }))
          : this.store.dispatch(updateIngredient({ ingredient }))
      );

    this.close();
  }

  public delete() {
    if (this.form.invalid) return;

    this.store.dispatch(deleteIngredient({ id: this.chosenIngredient.id }));

    this.close();
  }

  public close() {
    this.dialog.close();
  }

  ngOnInit(): void {}
}
