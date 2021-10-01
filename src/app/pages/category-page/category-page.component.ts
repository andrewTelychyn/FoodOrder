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

type OrderKey = 'bydefault' | 'byprice' | 'byname';

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
  public chosenSortType$: BehaviorSubject<OrderKey>;

  public inputSearch = new FormControl('');

  public showSearch: boolean = false;
  public showOrder: boolean = false;

  public sortTypes: {
    [key in OrderKey]: {
      name: string;
      sortFunction: (a: Product, b: Product) => number;
      isUp: boolean;
    };
  } = {
    bydefault: {
      name: 'By default',
      sortFunction: (a, b) => 1,
      isUp: true,
    },
    byname: {
      name: 'By name',
      sortFunction: function (a, b) {
        if (a.name == b.name) return 0;
        if ((a.name > b.name && this.isUp) || (a.name < b.name && !this.isUp))
          return 1;
        return -1;
      },
      isUp: true,
    },
    byprice: {
      name: 'By price',
      sortFunction: function (a, b) {
        if (a.cost == b.cost) return 0;
        if ((a.cost > b.cost && this.isUp) || (a.cost < b.cost && !this.isUp))
          return 1;
        return -1;
      },
      isUp: true,
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
    this.chosenSortType$ = new BehaviorSubject<OrderKey>('bydefault');
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
    let value = this.chosenSortType$.getValue();

    if (value !== type) {
      this.sortTypes[value].isUp = true;
    } else {
      this.sortTypes[type].isUp = !this.sortTypes[type].isUp;
    }

    this.chosenSortType$.next(type as OrderKey);
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
    );

    merge(this.chosenSortType$, this.originalProducts$, input$)
      .pipe(
        switchMap((i) => this.chosenSortType$),
        switchMap((value) =>
          this.originalProducts$.pipe(
            map((array) =>
              [...array]
                .sort(
                  this.sortTypes[value].sortFunction.bind(this.sortTypes[value])
                )
                .filter((item) =>
                  item.name.toLowerCase().includes(this.inputSearch.value)
                )
            )
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((array) => (this.products = array));
  }

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
    this.chosenSortType$.unsubscribe();
    this.originalProducts$.unsubscribe();
  }
}
