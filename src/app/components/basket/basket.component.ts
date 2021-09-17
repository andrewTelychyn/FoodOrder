import { Component, Input } from '@angular/core';
import { Basket } from '../../shared/models/basket.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  @Input() basket: Basket;

  constructor() {
    this.basket = new Basket();
  }

  closeWindow = () => {
    this.basket.products = [];
  };
}
