import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  Observable,
  merge,
  zip,
  combineLatest,
  Subscription,
  of,
} from 'rxjs';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import {
  Category,
  Ingredient,
  Product,
} from '../../shared/models/product.model';
import { Basket } from '../../shared/models/basket.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { select, Store } from '@ngrx/store';
import {
  selectChosenCategory,
  getProductsByCategory,
} from 'src/app/store/main.selectors';
import { tap, map, switchMap, filter } from 'rxjs/operators';
import { MainState } from 'src/app/store/shared/store.model';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  public basket$: BehaviorSubject<Basket>;
  public store$: Observable<MainState>;

  public products: Product[] = [];
  public chosenProduct: Product | undefined;
  public chosenCategory: Category | undefined;
  public allCategories: Category[] = [];

  public subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private basketService: BasketService,
    private store: Store<{ main: MainState }>
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

  public isColored(prod: Product) {
    return { 'tile-selected': prod == this.chosenProduct };
  } //changedetection

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        filter((i) => i.productId),
        switchMap((param) =>
          this.store$.pipe(
            filter((i) => i.categories.categories.length > 0),
            filter((i) => {
              if (
                i.categories.categories.findIndex(
                  (p) => p.value == param.productId
                ) < 0
              ) {
                this.router.navigate(['menu/burger']);
                return false;
              }
              return true;
            }),
            select(selectChosenCategory, param.productId)
          )
        ),
        tap((c) => (this.chosenCategory = c)),
        map((c) => c.id),
        switchMap((id) => this.store$.pipe(select(getProductsByCategory, id)))
      )
      .subscribe((data) => (this.products = data));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
