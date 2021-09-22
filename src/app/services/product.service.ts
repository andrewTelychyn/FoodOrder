import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Category,
  Ingredient,
  Product,
  ProductsState,
} from '../shared/models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.API + 'categories');
  }

  private getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.API + 'products');
  }

  private getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(environment.API + 'ingredients');
  }

  public getAll(): Observable<ProductsState> {
    return zip(
      this.getAllCategories(),
      this.getAllIngredients(),
      this.getAllProducts()
    ).pipe(
      map(([categories, ingredients, products]) => ({
        categories,
        ingredients,
        products,
      }))
    );
  }
}
