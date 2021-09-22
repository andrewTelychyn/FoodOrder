import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketOrder } from '../shared/models/basket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  public basket$: BehaviorSubject<Basket>;

  constructor() {
    this.basket$ = new BehaviorSubject<Basket>(
      new Basket(localStorage.getItem('userId')!)
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
    this.basket$.next(new Basket(localStorage.getItem('userId')!));
  }
}
