import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { ProductService } from '../../services/product.service';
import {
  Category,
  Ingredient,
  Product,
  ProductsState,
} from '../../shared/models/product.model';
import { Basket } from '../../shared/models/basket.model';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  // public basket: Basket;
  public basket$: BehaviorSubject<Basket>;
  public state$: Observable<{ main: ProductsState }>;

  public products: Product[] = [];
  public chosenProduct: Product | undefined;
  public chosenCategory: Category | undefined;
  public allCategories: Category[] = [];

  private subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    // private productService: ProductService,
    private basketService: BasketService,
    private store: Store<{ main: ProductsState }>
  ) {
    this.basket$ = basketService.basket$;
    this.state$ = store;
  }

  selectProduct = (prod: Product) => {
    if (this.chosenProduct?.id !== prod.id) {
      this.chosenProduct = prod;
    }
    this.dialog.open(ModalDialogComponent, {
      data: {
        product: this.chosenProduct,
        category: this.chosenCategory,
      },
    });
  };

  subscribeUrl = () => {
    let sub = this.route.params.subscribe((res) => {
      let urlParam = res.productId;

      this.store.subscribe((data) => {
        this.chosenCategory =
          data.main.categories.find((i) => i.value === urlParam) ||
          data.main.categories[0];

        this.loadProducts();
      });
      this.chosenProduct = undefined;
    });

    this.subs.push(sub);
  };

  loadProducts = () => {
    this.store.subscribe(
      (data) =>
        (this.products = data.main.products.filter((i) =>
          i.categoryIds.includes(this.chosenCategory?.id!)
        ))
    );
  };

  ngOnInit(): void {
    this.subscribeUrl();
  }

  ngOnDestroy(): void {
    if (this.subs.length > 0) this.subs.map((i) => i.unsubscribe());
  }
}
