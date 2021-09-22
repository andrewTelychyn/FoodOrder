import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  Observable,
  merge,
  zip,
  combineLatest,
  Subscription,
} from 'rxjs';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import {
  Category,
  Ingredient,
  Product,
  ProductsState,
} from '../../shared/models/product.model';
import { Basket } from '../../shared/models/basket.model';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { select, Store } from '@ngrx/store';
import {
  selectChosenCategory,
  getProductsByCategory,
} from 'src/app/store/product/product.selectors';
import { tap, map, switchMap, mapTo, mergeMap, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  public basket$: BehaviorSubject<Basket>;
  public store$: Observable<ProductsState>;

  public products: Product[] = [];
  public chosenProduct: Product | undefined;
  public chosenCategory: Category | undefined;
  public allCategories: Category[] = [];

  public subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private basketService: BasketService,
    private store: Store<{ main: ProductsState }>
  ) {
    this.basket$ = this.basketService.basket$;
    this.store$ = this.store.select('main');
  }

  public selectProduct(prod: Product) {
    this.chosenProduct = prod;
    this.dialog.open(ModalDialogComponent, {
      data: {
        product: this.chosenProduct,
        unSelect: () => (this.chosenProduct = undefined),
      },
    });
  }

  ngOnInit(): void {
    this.subscription = combineLatest(this.route.params, this.store$).subscribe(
      // SWITCHMAP
      (data) => {
        if (data[0].productId && data[1].categories.length > 0) {
          this.store$
            .pipe(
              select(selectChosenCategory, data[0].productId),
              tap((c) => {
                this.chosenCategory = c;
              }),
              map((c) => c.id),
              switchMap((i) =>
                this.store$.pipe(select(getProductsByCategory, i))
              )
            )
            .subscribe((data) => (this.products = data));
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
