import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Category,
  Ingredient,
  IngredientSet,
  IngredientSetDTO,
  Product,
  ProductsState,
} from '../shared/models/product.model';
import { map, switchMap } from 'rxjs/operators';
import {
  Basket,
  BasketDTO,
  BasketOrder,
  BasketOrderDTO,
} from '../shared/models/basket.model';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public saveOrder(basket: Basket) {
    this.http.post<Basket>(environment.API + 'orders/', basket).pipe();
    // this.updateUser(basket.id).subscribe((data) => console.log(data));
    // this.saveBasketOrders(basket.products);

    let ingredients: IngredientSet[] = basket.products.reduce(
      (acc: IngredientSet[], bo: BasketOrder) => acc.concat(bo.options),
      []
    );

    return merge(
      this.saveBasketOrders(basket.products),
      this.saveIngredientSets(ingredients),
      this.updateUser(basket.id),
      this.saveBasket(basket)
    );
  }

  private saveBasket(basket: Basket) {
    let dto: BasketDTO = {
      id: basket.id,
      commonPrice: basket.commonPrice,
      userId: basket.userId,
      basketOrderIds: basket.products.map((i) => i.id),
    } as BasketDTO;

    return this.http.post<BasketDTO>(environment.API + 'orders', dto);
  }

  private saveIngredientSets(ingredientSets: IngredientSet[]) {
    let dtos: IngredientSetDTO[] = ingredientSets.map(
      (i) =>
        ({
          amount: i.amount,
          id: i.id,
          ingredientId: i.ingredient.id,
        } as IngredientSetDTO)
    );

    return this.http.post<IngredientSetDTO[]>(
      environment.API + 'ingredientsets',
      dtos
    );
  }

  private saveBasketOrders(basketOrders: BasketOrder[]) {
    let dtos: BasketOrderDTO[] = basketOrders.map(
      (i) =>
        ({
          amount: i.amount,
          ingredientIds: i.options.map((el) => el.id),
          productId: i.product.id,
          id: i.id,
        } as BasketOrderDTO)
    );

    return this.http.post<BasketOrderDTO[]>(
      environment.API + 'basketorders',
      dtos
    );
  }

  private updateUser(basketId: string) {
    let user: User = JSON.parse(localStorage.getItem('user')!);
    user.ordersList.push(basketId);

    return this.http.put<User>(environment.API + `users/${user.id}`, user);

    // return this.http
    //   .delete(environment.API + `users/${user.id}`)
    //   .pipe(
    //     switchMap((i) => this.http.post<User>(environment.API + 'users/', user))
    //   );

    // this.http
    //   .post<User>(environment.API + `users/${user.id}`, user)
    //   .subscribe((data) => console.log(data));
  }
}
