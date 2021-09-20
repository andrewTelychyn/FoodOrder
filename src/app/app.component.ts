import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductService } from './services/product.service';
import {
  Category,
  Ingredient,
  Product,
  ProductsState,
} from './shared/models/product.model';
import {
  addCategories,
  addIngredients,
  addProducts,
} from './store/product/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-job-test';

  constructor(
    private store: Store<{ main: ProductsState }>,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.store.dispatch(addProducts({ products: data }));
    });

    this.productService.getAllIngredients().subscribe((data: Ingredient[]) => {
      this.store.dispatch(addIngredients({ ingredients: data }));
    });

    this.productService.getAllCategories().subscribe((data: Category[]) => {
      this.store.dispatch(addCategories({ categories: data }));
    });
  }
}
