import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
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
  loadAll,
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
    this.productService
      .getAll()
      .pipe(take(1))
      .subscribe((store: ProductsState) => this.store.dispatch(loadAll(store)));
  }
}
