import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  merge,
  of,
  from,
} from 'rxjs';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { Category, Product } from '../../shared/models/product.model';
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

type OrderKey = 'bydefault' | 'fromcheap' | 'fromexpansive' | 'byname';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  public basket$: BehaviorSubject<Basket>;
  public store$: Observable<MainState>;

  public showSearch: boolean = false;
  public showOrder: boolean = false;
  // public chosenOrderType: OrderKey = 'bydefault';
  public chosenOrderType: Observable<OrderKey>;
  public readonly orderTypes: { [key in OrderKey]: string } = {
    bydefault: 'By default',
    byname: 'By name',
    fromcheap: 'From cheap',
    fromexpansive: 'From expansive',
  };

  public products: Product[] = [];
  public originalProducts: BehaviorSubject<Product[]>;
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

    this.originalProducts = new BehaviorSubject<Product[]>([]);
    this.chosenOrderType = new Observable<OrderKey>((s) => s.next('bydefault'));

    from(this.chosenOrderType).subscribe((value) => console.log(value));

    merge(this.chosenOrderType, this.originalProducts)
      .pipe(
        filter((val) => typeof val == 'string'),
        switchMap((value) => {
          switch (value) {
            case 'byname':
              return this.originalProducts.pipe(
                map((array) => array.sort((a, b) => (a.name > b.name ? 1 : -1)))
              );
            case 'fromexpansive':
              return this.originalProducts.pipe(
                map((array) => array.sort((a, b) => (a.cost > b.cost ? 1 : -1)))
              );
            case 'fromcheap':
              return this.originalProducts.pipe(
                map((array) => array.sort((a, b) => (a.cost > b.cost ? -1 : 1)))
              );
            case 'bydefault':
            default:
              return this.originalProducts;
          }
        })
      )
      .subscribe((data) => {
        this.products = data;
        console.log(this.chosenOrderType);
      });
  }

  public selectProduct(prod: Product): void {
    this.chosenProduct = prod;

    this.dialog.open(ModalDialogComponent, {
      data: {
        product: this.chosenProduct,
        unSelect: () => (this.chosenProduct = undefined),
      },
    });
  }

  public openCloseSearch(): void {
    this.showSearch = !this.showSearch;
  }

  public openCloseOrder(): void {
    this.showOrder = !this.showOrder;
  }

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        filter((i) => i.productId),
        switchMap((param) =>
          this.store$.pipe(
            filter((i) => i.categories.items.length > 0),
            filter((i) => {
              if (
                i.categories.items.findIndex((p) => p.name == param.productId) <
                0
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
      .subscribe((data) => {
        this.originalProducts.next(data);
        console.log(data);
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
