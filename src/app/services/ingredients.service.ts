import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, Ingredient } from '../shared/models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(private http: HttpClient) {}

  public get(category: Category): Observable<Ingredient[]> {
    return this.http
      .get<Ingredient[]>(environment.API + 'ingredients/')
      .pipe(
        map((data) => data.filter((i) => i.categoryIds.includes(category.id)))
      );
  }
}
