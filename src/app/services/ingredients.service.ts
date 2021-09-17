import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductOptionDb } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(private http: HttpClient) {}

  public get(key: string): Observable<ProductOptionDb> {
    return this.http.get<ProductOptionDb>(
      environment.API + `ingredients/${key}`
    );
  }
}
