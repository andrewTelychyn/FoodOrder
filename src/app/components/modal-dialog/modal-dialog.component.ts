import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';
import { IngredientService } from '../../services/ingredients.service';
import { BasketOrder } from '../../shared/models/basket.model';
import {
  Category,
  Product,
  ProductsState,
} from '../../shared/models/product.model';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnDestroy {
  public basketOrder: BasketOrder | undefined;
  // dialog: MatDialogRef<ModalDialogComponent>;

  // private addingFunc: (prod: BasketOrder) => void;
  private subscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      category: Category;
      product: Product;
      // func: (prod: BasketOrder) => void;
    },
    private dialog: MatDialogRef<ModalDialogComponent>,
    // private productService: IngredientService,
    private store: Store<{ main: ProductsState }>,
    private basketService: BasketService
  ) {
    // this.subscription = ingredientService
    //   .get(data.category)
    //   .subscribe((res) => {
    //     this.basketOrder = new BasketOrder(data.product, res);
    //   });
    store.subscribe(
      (res) =>
        (this.basketOrder = new BasketOrder(
          data.product,
          res.main.ingredients.filter((i) =>
            // i.categoryIds.includes(data.category.id)
            data.product.ingredientIds.includes(i.id)
          )
        ))
    );
  }

  decreaseAmount = (chosenId: string) => {
    if (this.basketOrder) {
      this.basketOrder.options.map((item) => {
        if (item.id == chosenId && item.optionAmount - 1 >= 0) {
          item.optionAmount -= 1;
        }
      });
    }
  };

  increaseAmount = (chosenId: string) => {
    if (this.basketOrder) {
      this.basketOrder.options.map((item) => {
        if (item.id == chosenId) {
          item.optionAmount += 1;
        }
      });
    }
  };

  apply = () => {
    if (this.basketOrder) this.basketService.addProduct(this.basketOrder);
    this.dialog.close();
  };

  close = () => {
    this.dialog.close();
  };

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
