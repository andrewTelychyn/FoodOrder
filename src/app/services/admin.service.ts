import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, Ingredient, Product } from '../shared/models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  public saveNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.API + 'products', product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      environment.API + `products/${product.id}`,
      product
    );
  }

  public saveNewIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(
      environment.API + 'ingredients',
      ingredient
    );
  }

  public updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(
      environment.API + `ingredients/${ingredient.id}`,
      ingredient
    );
  }

  public saveNewCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(environment.API + 'categories', category);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      environment.API + `categories/${category.id}`,
      category
    );
  }

  public deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(environment.API + `products/${id}`);
  }

  public deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(environment.API + `categories/${id}`);
  }

  public deleteIngredient(id: string): Observable<Ingredient> {
    return this.http.delete<Ingredient>(environment.API + `ingredients/${id}`);
  }
}
