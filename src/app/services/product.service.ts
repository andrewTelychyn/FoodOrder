import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, Product } from '../shared/models/product.model';
import { first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public get(key: string, id: string): Observable<Product> {
    return this.http.get<Product>(environment.API + `products/${key}/${id}`);
  }

  public getProducts(category: Category): Observable<Product[]> {
    console.log(category);

    return this.http
      .get<Product[]>(environment.API + 'products/')
      .pipe(map((item) => item.filter((el) => el.categoryId === category.id)));

    // return this.http.get<Category[]>(environment.API + 'categories/').pipe(
    //   map((data) => data.filter((item) => item.value === key)),
    //   switchMap((v) => {
    //     return this.http
    //       .get<Product[]>(environment.API + 'products/')
    //       .pipe(map((p) => p.filter((item) => item.categoryId === v[0].id)));
    //   })
    // );

    // return this.http.get<ProductDb>(environment.API + 'products/' + key); // http://localhost:3000/burgers
  }

  public getCategory(key: string) {
    return this.http.get<Category[]>(environment.API + 'categories/').pipe(
      map((item) => {
        return item.filter((el) => el.value === key)[0];
      })
    );
  }
}
