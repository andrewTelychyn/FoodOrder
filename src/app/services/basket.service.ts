import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketOrder } from '../shared/models/basket.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  public basket$: BehaviorSubject<Basket>;

  constructor(private userService: UserService) {
    this.basket$ = new BehaviorSubject<Basket>(
      new Basket(userService.user?.id)
    );
  }

  public addProduct(item: BasketOrder) {
    const currentValue = this.basket$.getValue();

    currentValue.addProduct(item);
    this.basket$.next(currentValue);
  }

  public removeProduct(id: string) {
    const currentValue = this.basket$.getValue();

    currentValue.removeProduct(id);
    this.basket$.next(currentValue);
  }

  public increaseOne(item: BasketOrder) {
    const currentValue = this.basket$.getValue();

    currentValue.increaseOne(item);
    this.basket$.next(currentValue);
  }

  public decreaseOne(item: BasketOrder) {
    const currentValue = this.basket$.getValue();

    currentValue.decreaseOne(item);
    this.basket$.next(currentValue);
  }

  public clearAll() {
    this.basket$.next(new Basket(this.userService.user?.id));
  }
}
