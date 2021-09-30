import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, merge, Subject } from 'rxjs';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { Category, Product } from '../../shared/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  selectChosenCategory,
  getProductsByCategory,
} from 'src/app/store/main.selectors';
import {
  tap,
  map,
  switchMap,
  filter,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { MainState } from 'src/app/store/shared/store.model';
import { FormControl } from '@angular/forms';
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericUp,
  faSortNumericDown,
} from '@fortawesome/free-solid-svg-icons';

// type OrderKey = 'bydefault' | 'fromcheap' | 'fromexpansive' | 'byname';
type OrderKey = 'bydefault' | 'byprice' | 'byname';
type Direction = 'up' | 'down';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  public faSortAlphaDown = faSortAlphaDown;
  public faSortAlphaUp = faSortAlphaUp;
  public faSortNumericUp = faSortNumericUp;
  public faSortNumericDown = faSortNumericDown;

  public destroy$: Subject<boolean> = new Subject<boolean>();
  public store$: Observable<MainState>;
  public originalProducts$: BehaviorSubject<Product[]>;
  public chosenOrderType$: BehaviorSubject<OrderKey>;

  public inputSearch = new FormControl('');

  public showSearch: boolean = false;
  public showOrder: boolean = false;

  public sortTypes: {
    [key in OrderKey]: {
      name: string;
      sortFunction: (a: Product, b: Product) => number;
      direction: Direction;
    };
  } = {
    bydefault: {
      name: 'By default',
      sortFunction: (a, b) => 1,
      direction: 'up',
    },
    byname: {
      name: 'By name',
      sortFunction: function (a, b) {
        if (a.name == b.name) return 0;
        if (
          (a.name > b.name && this.direction == 'up') ||
          (a.name < b.name && this.direction == 'down')
        )
          return 1;
        return -1;
      },
      direction: 'up',
    },
    byprice: {
      name: 'By price',
      sortFunction: function (a, b) {
        if (a.cost == b.cost) return 0;
        if (
          (a.cost > b.cost && this.direction == 'up') ||
          (a.cost < b.cost && this.direction == 'down')
        )
          return 1;
        return -1;
      },
      direction: 'up',
    },
  };

  public products: Product[] = [];
  public chosenProduct: Product | undefined;
  public chosenCategory: Category | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<{ main: MainState }>
  ) {
    this.store$ = this.store.select('main');

    this.originalProducts$ = new BehaviorSubject<Product[]>([]);
    this.chosenOrderType$ = new BehaviorSubject<OrderKey>('bydefault');
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
    this.inputSearch.setValue('');
  }

  public openCloseOrder(): void {
    this.showOrder = !this.showOrder;
  }

  public sortChange(type: string): void {
    let value = this.chosenOrderType$.getValue();

    if (value !== type) {
      this.sortTypes[value].direction = 'up';
    } else {
      this.sortTypes[type].direction =
        this.sortTypes[type].direction == 'up' ? 'down' : 'up';
    }

    this.chosenOrderType$.next(type as OrderKey);
  }

  ngOnInit(): void {
    this.route.params
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
        switchMap((id) => this.store$.pipe(select(getProductsByCategory, id))),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.originalProducts$.next(data);
      });

    const input$ = this.inputSearch.valueChanges.pipe(
      debounceTime(500),
      map((value: string) => value.trim().toLowerCase()),
      distinctUntilChanged()
      // tap((value) => console.log(value)),
      // takeUntil(this.destroy$)
    );

    merge(this.chosenOrderType$, this.originalProducts$, input$)
      .pipe(
        switchMap((i) => this.chosenOrderType$),
        switchMap((value) =>
          this.originalProducts$.pipe(
            tap(
              (array) =>
                (this.products = [...array]
                  .sort(
                    this.sortTypes[value].sortFunction.bind(
                      this.sortTypes[value]
                    )
                  )
                  .filter((array) =>
                    array.name.toLowerCase().includes(this.inputSearch.value)
                  ))
            )
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {});
  }

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
    this.chosenOrderType$.unsubscribe();
    this.originalProducts$.unsubscribe();
  }
}
