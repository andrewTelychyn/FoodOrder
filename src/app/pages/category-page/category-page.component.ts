import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { ProductService } from '../../services/product.service';
import { Category, Product } from '../../shared/models/product.model';
import { Basket } from '../../shared/models/basket.model';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  public basket: Basket;
  public products: Product[] = [];
  public chosenProduct: Product | undefined;
  public chosenCategory: Category | undefined;
  public allCategories: Category[] = [];

  private subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private productService: ProductService,
    private basketService: BasketService
  ) {
    this.basket = new Basket();
  }

  selectProduct = (prod: Product) => {
    if (this.chosenProduct?.id !== prod.id) {
      this.chosenProduct = prod;
    }
    this.dialog.open(ModalDialogComponent, {
      data: {
        product: this.chosenProduct,
        category: this.chosenCategory,
        func: this.basket.addProduct.bind(this.basket),
      },
    });
  };

  subscribeUrl = () => {
    let sub = this.route.params.subscribe((res) => {
      let urlParam = res.productId;

      this.chosenCategory =
        this.allCategories.find((i) => i.value === urlParam) ||
        this.allCategories[0];

      if (this.allCategories.length > 0)
        this.loadProducts(this.chosenCategory!);
      this.chosenProduct = undefined;
    });

    this.subs.push(sub);
  };

  loadProducts = (category: Category) => {
    let sub = this.productService
      .getProducts(category)
      .subscribe((response) => {
        this.products = response;
      });

    this.subs.push(sub);
  };

  ngOnInit(): void {
    let sub = this.productService.getAllCategories().subscribe((data) => {
      this.allCategories = data;
      this.subscribeUrl();
    });

    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.basketService.basket = this.basket;

    if (this.subs.length > 0) this.subs.map((i) => i.unsubscribe());
  }
}
