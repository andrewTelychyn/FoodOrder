import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addCategories } from './store/category/category.actions';
import { addIngredients } from './store/ingredient/ingredient.actions';
import { addProducts } from './store/product/product.actions';
import { MainState } from './store/shared/store.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-job-test';

  constructor(private store: Store<{ main: MainState }>) {}

  ngOnInit() {
    this.store.dispatch(addCategories());
    this.store.dispatch(addIngredients());
    this.store.dispatch(addProducts());
  }
}
