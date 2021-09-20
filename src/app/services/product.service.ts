import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, Ingredient, Product } from '../shared/models/product.model';
import { map, filter, first, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // public get(key: string, id: string): Observable<Product> {
  //   return this.http.get<Product>(environment.API + `products/${key}/${id}`);
  // }

  public getProducts(category: Category) {
    return this.http
      .get<Product[]>(environment.API + 'products/')
      .pipe(
        map((item) => item.filter((el) => el.categoryIds.includes(category.id)))
      );
  }

  public getCategory(key: string) {
    return this.http.get<Category>(environment.API + 'categories/').pipe(
      filter((item) => item.value === key),
      first()
    );
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.API + 'categories');
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.API + 'products');
  }

  public getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(environment.API + 'ingredients');
  }
}
