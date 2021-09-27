import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { Product } from 'src/app/shared/models/product.model';
import {
  changeProduct,
  deleteProduct,
} from 'src/app/store/product/product.actions';
import { MainState } from 'src/app/store/shared/store.model';

@Component({
  selector: 'app-admin-modal-dialog',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  public chosenProduct: Product;
  public form: FormGroup;

  public store$: Observable<MainState>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      product: Product;
    },
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AdminProductComponent>,
    private store: Store<{ main: MainState }>,
    private adminService: AdminService
  ) {
    this.chosenProduct = this.data.product;

    this.store$ = this.store.select('main');

    this.form = this.formBuilder.group({
      categories: [[...data.product.categoryIds], Validators.required],
      ingredients: [[...data.product.ingredientIds], Validators.required],
      name: [data.product.name, Validators.required],
      image: [data.product.img, Validators.required],
      cost: [data.product.cost, Validators.required],
    });
  }

  public submit() {
    console.log(
      this.form.controls.ingredients.value,
      this.form.controls.categories.value
    );

    if (this.form.invalid) return;

    let product: Product = {
      id: this.chosenProduct.id,
      name: this.form.controls.name.value,
      img: this.form.controls.image.value,
      cost: Number(this.form.controls.cost.value),
      ingredientIds: this.form.controls.ingredients.value,
      categoryIds: this.form.controls.categories.value,
    };

    this.store$
      .pipe(
        switchMap((store) => {
          if (
            store.products.products.findIndex((p) => p.id == product.id) >= 0
          ) {
            return this.adminService.updateProduct(product);
          } else {
            return this.adminService.saveNewProduct(product);
          }
        }),
        take(1)
      )
      .subscribe((data) => {
        this.store.dispatch(changeProduct({ product }));
        this.dialog.close();
      });
  }

  public delete() {
    if (this.form.invalid) return;

    this.adminService
      .deleteProduct(this.chosenProduct.id)
      .subscribe((data) => {});
    this.store.dispatch(deleteProduct({ id: this.chosenProduct.id }));

    this.close();
  }

  public close() {
    this.dialog.close();
  }

  ngOnInit(): void {}
}
