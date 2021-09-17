import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { ProductService } from '../../services/product.service';
import {
  Category,
  Product,
  ProductTypes,
} from '../../shared/models/product.model';
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
  public productType: ProductTypes | undefined;
  public category: Category | undefined;

  private productDbSubscription: Subscription | undefined;
  private urlParamsSubscription: Subscription | undefined;

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
      data: { prod, func: this.basket.addProduct.bind(this.basket) },
    });
  };

  loadProducts = (category: Category) => {
    this.productDbSubscription = this.productService
      .getProducts(category)
      .subscribe((response) => {
        console.log(response, 'respone');

        this.products = response;
      });
  };

  ngOnInit(): void {
    this.urlParamsSubscription = this.route.params.subscribe((res) => {
      let urlParam = res.productId as ProductTypes;

      this.productType = Object.values(ProductTypes).includes(urlParam)
        ? urlParam
        : ProductTypes.drink;

      this.productService
        .getCategory(urlParam)
        .subscribe((item) => (this.category = item));

      if (this.category) this.loadProducts(this.category);
      this.chosenProduct = undefined;
    });
  }

  ngOnDestroy(): void {
    this.basketService.basket = this.basket;

    if (this.productDbSubscription) this.productDbSubscription.unsubscribe();
    if (this.urlParamsSubscription) this.urlParamsSubscription.unsubscribe();
  }
}
