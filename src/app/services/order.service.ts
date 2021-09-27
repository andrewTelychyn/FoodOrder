import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, of, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IngredientSetDTO } from '../shared/models/product.model';
import {
  concatAll,
  filter,
  map,
  mergeAll,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  Basket,
  BasketDTO,
  BasketOrder,
  BasketOrderDTO,
} from '../shared/models/basket.model';
import { User, UserDTO } from '../shared/models/user.model';
import { select, Store } from '@ngrx/store';
import { UserService } from './user.service';
import { MainState } from '../store/shared/store.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public loadOrders() {
    let userId = this.userService.user?.id;

    return this.http
      .get<BasketDTO[]>(environment.API + 'baskets')
      .pipe(
        map((baskets) => baskets.filter((basket) => basket.user.id == userId))
      );
  }

  public saveOrder(basket: Basket, user: UserDTO) {
    return merge(this.saveBasket(basket, user), this.updateUser(basket.id));
  }

  private saveBasket(basket: Basket, user: UserDTO) {
    let dto: BasketDTO = {
      id: basket.id,
      user,
      commonPrice: basket.commonPrice,
      timestamp: new Date(Date.now()).getTime(),
      basketOrders: basket.products.map((basketOrder) => {
        return {
          amount: basketOrder.amount,
          name: basketOrder.product.name,
          price: basketOrder.product.cost,
          totalPrice: basketOrder.totalPrice,
          ingredients: basketOrder.options.map((ingredientset) => {
            return {
              amount: ingredientset.amount,
              price: ingredientset.totalPrice,
              name: ingredientset.ingredient.optionName,
            } as IngredientSetDTO;
          }),
        } as BasketOrderDTO;
      }),
    };

    return this.http.post<BasketDTO>(environment.API + 'baskets', dto);
  }

  private updateUser(basketId: string) {
    this.userService.user?.ordersList.push(basketId);
    localStorage.setItem('user', JSON.stringify(this.userService.user));

    return this.http.put<User>(
      environment.API + `users/${this.userService.user?.id}`,
      this.userService.user
    );
  }
}
