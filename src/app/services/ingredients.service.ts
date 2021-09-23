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

  public saveNewProduct(product: Product) {
    return this.http.post<Product>(environment.API + 'products', product);
  }

  public updateProduct(product: Product) {
    return this.http.put<Product>(
      environment.API + `products/${product.id}`,
      product
    );
  }
}
