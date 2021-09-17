import { Injectable } from '@angular/core';
import { Basket } from '../shared/models/basket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  public basket: Basket;

  constructor() {
    this.basket = new Basket();
  }
}
