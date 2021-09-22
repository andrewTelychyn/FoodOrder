import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { BasketService } from 'src/app/services/basket.service';
import { getProductIngredients } from 'src/app/store/product/product.selectors';
import { BasketOrder } from '../../shared/models/basket.model';
import {
  IngredientSet,
  Product,
  ProductsState,
} from '../../shared/models/product.model';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent {
  public basketOrder: BasketOrder | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      product: Product;
      unSelect: () => void;
    },
    private dialog: MatDialogRef<ModalDialogComponent>,
    private store: Store<{ main: ProductsState }>,
    private basketService: BasketService
  ) {
    store
      .select('main')
      .pipe(select(getProductIngredients, data.product), take(1))
      .subscribe(
        (result) => (this.basketOrder = new BasketOrder(data.product, result))
      );
  }

  public decreaseAmount(chosenId: string) {
    if (this.basketOrder) {
      this.basketOrder.options.map((item) => {
        if (item.id == chosenId && item.amount - 1 >= 0) {
          item.amount -= 1;
        }
      });
    }
  }

  public increaseAmount = (chosenId: string) => {
    if (this.basketOrder) {
      this.basketOrder.options.map((item) => {
        if (item.id == chosenId) {
          item.amount += 1;
        }
      });
    }
  };

  public apply() {
    if (this.basketOrder) this.basketService.addProduct(this.basketOrder);
    this.data.unSelect();
    this.dialog.close();
  }

  public close() {
    this.dialog.close();
  }
}
