import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { RoleGuardService } from 'src/app/services/auth/roleguard.service';
import { BasketService } from 'src/app/services/basket.service';
import { getProductIngredients } from 'src/app/store/main.selectors';
import { MainState } from 'src/app/store/shared/store.model';
import { BasketOrder } from '../../shared/models/basket.model';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent {
  public basketOrder: BasketOrder | undefined;
  public isAdmin: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      product: Product;
      unSelect: () => void;
    },
    private dialog: MatDialogRef<ModalDialogComponent>,
    private store: Store<{ main: MainState }>,
    private basketService: BasketService,
    private roleGuard: RoleGuardService
  ) {
    this.store
      .select('main')
      .pipe(select(getProductIngredients, data.product), take(1))
      .subscribe(
        (result) => (this.basketOrder = new BasketOrder(data.product, result))
      );

    this.isAdmin = this.roleGuard.checkRole('admin');
  }

  public decreaseAmount(chosenId: string) {
    if (this.basketOrder) {
      this.basketOrder.options.map((item) => {
        if (item.id == chosenId && item.amount - 1 >= 0) {
          item.amount -= 1;
          item.totalPrice -= item.ingredient.cost;
          this.basketOrder!.totalPrice -= item.ingredient.cost;
        }
      });
    }
  }

  public increaseAmount = (chosenId: string) => {
    if (this.basketOrder) {
      this.basketOrder.options.map((item) => {
        if (item.id == chosenId) {
          item.amount += 1;
          item.totalPrice += item.ingredient.cost;
          this.basketOrder!.totalPrice += item.ingredient.cost;
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
    this.data.unSelect();
    this.dialog.close();
  }
}
