import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, Ingredient, Product } from '../shared/models/product.model';
import { map } from 'rxjs/operators';
import { MainState, ProductsState } from '../store/shared/store.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.API + 'categories');
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.API + 'products');
  }

  public getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(environment.API + 'ingredients');
  }

  public getAll(): Observable<MainState> {
    return zip(
      this.getAllCategories(),
      this.getAllIngredients(),
      this.getAllProducts()
    ).pipe(
      map(([categories, ingredients, products]) => ({
        categories: { items: categories },
        ingredients: { items: ingredients },
        products: { items: products },
      }))
    );
  }
}
