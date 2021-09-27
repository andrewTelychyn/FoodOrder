import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { Category, Product } from 'src/app/shared/models/product.model';
import {
  changeCategory,
  deleteCategory,
} from 'src/app/store/category/category.actions';

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
    private store: Store<{ main: MainState }>,
    private adminService: AdminService
  ) {
    this.chosenCategory = this.data.category;

    this.store$ = this.store.select('main');

    console.log(data.category);

    this.form = this.formBuilder.group({
      value: [data.category.value, Validators.required],
      icon: [data.category.icon, Validators.required],
    });
  }

  public submit() {
    if (this.form.invalid) return;

    let category: Category = {
      id: this.chosenCategory.id,
      value: String(this.form.controls.value.value).toLowerCase(),
      icon: this.form.controls.icon.value,
    };

    this.store$
      .pipe(
        switchMap((store) => {
          if (
            store.categories.categories.findIndex((p) => p.id == category.id) >=
            0
          ) {
            return this.adminService.updateCategory(category);
          } else {
            return this.adminService.saveNewCategory(category);
          }
        }),
        take(1)
      )
      .subscribe((data) => {
        this.store.dispatch(changeCategory({ category }));
        this.dialog.close();
      });
  }

  public delete() {
    if (this.form.invalid) return;

    this.adminService
      .deleteCategory(this.chosenCategory.id)
      .subscribe((data) => {});
    this.store.dispatch(deleteCategory({ id: this.chosenCategory.id }));

    this.close();
  }

  public close() {
    this.dialog.close();
  }

  ngOnInit(): void {}
}
