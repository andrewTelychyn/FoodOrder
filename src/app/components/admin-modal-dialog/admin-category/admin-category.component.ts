import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/product.model';
import {
  addNewCategory,
  deleteCategory,
  updateCategory,
} from 'src/app/store/category/category.actions';
import { isCategoryNew } from 'src/app/store/main.selectors';

import { MainState } from 'src/app/store/shared/store.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  public chosenCategory: Category;
  public form: FormGroup;

  public store$: Observable<MainState>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      category: Category;
    },
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AdminCategoryComponent>,
    private store: Store<{ main: MainState }>
  ) {
    this.chosenCategory = this.data.category;

    this.store$ = this.store.select('main');

    this.form = this.formBuilder.group({
      value: [data.category.name, Validators.required],
      icon: [data.category.icon, Validators.required],
    });
  }

  public submit() {
    if (this.form.invalid) return;

    let category: Category = {
      id: this.chosenCategory.id,
      name: String(this.form.controls.value.value).toLowerCase(),
      icon: this.form.controls.icon.value,
    };

    this.store$
      .pipe(select(isCategoryNew, this.chosenCategory.id), take(1))
      .subscribe((bool) =>
        bool
          ? this.store.dispatch(addNewCategory({ category }))
          : this.store.dispatch(updateCategory({ category }))
      );

    this.close();
  }

  public delete() {
    if (this.form.invalid) return;

    this.store.dispatch(deleteCategory({ id: this.chosenCategory.id }));
    this.close();
  }

  public close() {
    this.dialog.close();
  }

  ngOnInit(): void {}
}
