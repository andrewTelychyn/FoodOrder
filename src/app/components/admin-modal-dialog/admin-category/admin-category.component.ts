import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import {
  Category,
  Product,
  ProductsState,
} from 'src/app/shared/models/product.model';
import {
  changeCategory,
  changeProduct,
} from 'src/app/store/product/product.actions';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  public chosenCategory: Category;
  public form: FormGroup;

  public store$: Observable<ProductsState>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      category: Category;
    },
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AdminCategoryComponent>,
    private store: Store<{ main: ProductsState }>,
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
      value: this.form.controls.value.value,
      icon: this.form.controls.icon.value,
    };

    this.store$
      .pipe(
        switchMap((store) => {
          if (store.categories.findIndex((p) => p.id == category.id) >= 0) {
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

  public close() {
    this.dialog.close();
  }

  ngOnInit(): void {}
}
