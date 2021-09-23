import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, of, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IngredientSet,
  IngredientSetDTO,
  ProductsState,
} from '../shared/models/product.model';
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

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private store$: Observable<ProductsState>;

  constructor(
    private http: HttpClient,
    private store: Store<{ main: ProductsState }>,
    private userService: UserService
  ) {
    this.store$ = this.store.select('main');
  }

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

    // let dto: BasketDTO = {
    //   id: basket.id,
    //   commonPrice: basket.commonPrice,
    //   userId: basket.userId,
    //   basketOrderIds: basket.products.map((i) => i.id),
    // } as BasketDTO;
  }

  private saveIngredientSets(ingredientSets: IngredientSet[]) {
    // let dtos: IngredientSetDTO[] = ingredientSets.map(
    //   (i) =>
    //     ({
    //       amount: i.amount,
    //       id: i.id,
    //       ingredientId: i.ingredient.id,
    //     } as IngredientSetDTO)
    // );
    // return of(...dtos).pipe(
    //   mergeMap((i) =>
    //     this.http.post<IngredientSetDTO>(environment.API + 'ingredientsets', i)
    //   )
    // );
  }

  private saveBasketOrders(basketOrders: BasketOrder[]) {
    // let dtos: BasketOrderDTO[] = basketOrders.map(
    //   (i) =>
    //     ({
    //       amount: i.amount,
    //       ingredientIds: i.options.map((el) => el.id),
    //       productId: i.product.id,
    //       id: i.id,
    //     } as BasketOrderDTO)
    // );
    // return of(...dtos).pipe(
    //   mergeMap((i) =>
    //     this.http.post<BasketOrderDTO>(environment.API + 'basketorders', i)
    //   )
    // );
  }

  private updateUser(basketId: string) {
    this.userService.user?.ordersList.push(basketId);
    localStorage.setItem('user', JSON.stringify(this.userService.user));

    return this.http.put<User>(
      environment.API + `users/${this.userService.user?.id}`,
      this.userService.user
    );
  }

  //
  //
  //
  //
  //
  //

  // public loadOrders() {
  // let userId = localStorage.getItem('userId');
  // let ingredients: IngredientSet[] = [];
  // let basketOrdersArray: BasketOrder[] = [];
  // this.http
  //   .get<BasketDTO[]>(environment.API + `baskets?userId=${userId}`)
  //   .pipe(
  //     switchMap((baskets) => of(...baskets)),
  //     switchMap((basket) =>
  //       this.http
  //         .get<BasketOrderDTO[]>(
  //           environment.API +
  //             `basketorders?${basket.basketOrderIds
  //               .map((id) => `id=${id}`)
  //               .join('&')}`
  //         )
  //         .pipe(
  //           switchMap((basketOrders) => of(...basketOrders)),
  //           mergeMap((basketOrder) =>
  //             this.http
  //               .get<IngredientSetDTO[]>(
  //                 environment.API +
  //                   `ingredientsets?${basketOrder.ingredientIds
  //                     .map((el) => `id=${el}`)
  //                     .join('&')}`
  //               )
  //               .pipe(
  //                 switchMap((ingredientsets) =>
  //                   this.store$.pipe(
  //                     select(convertIngredientSetDTO, ingredientsets)
  //                   )
  //                 ),
  //                 switchMap((ingredientsets) =>
  //                   this.store$.pipe(
  //                     select(convertBasketOrderDTO, {
  //                       basketOrder,
  //                       ingredientsets,
  //                     })
  //                   )
  //                 )
  //               )
  //           )
  //           // tap((i) => console.log(i))
  //         )
  //     )
  //   )
  // mergeMap(baskets => baskets.map(basket =>))
  // .subscribe((data) => console.log(data, 'end'));
  // }
}
