import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IngredientService } from '../../services/ingredients.service';
import { BasketOrder } from '../../shared/models/basket.model';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnDestroy {
  public basketOrder: BasketOrder | undefined;
  // dialog: MatDialogRef<ModalDialogComponent>;

  private addingFunc: (prod: BasketOrder) => void;
  private subscription: Subscription | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { prod: Product; func: (prod: BasketOrder) => void },
    private dialog: MatDialogRef<ModalDialogComponent>,
    private ingredientService: IngredientService
  ) {
    this.subscription = ingredientService
      .get(data.prod.type)
      .subscribe((res) => {
        console.log(res);

        this.basketOrder = new BasketOrder(data.prod, res.options);
      });
    this.addingFunc = data.func;
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
    if (this.basketOrder) this.addingFunc(this.basketOrder);
    this.dialog.close();
  };

  close = () => {
    this.dialog.close();
  };

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
