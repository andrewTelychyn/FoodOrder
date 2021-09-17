import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { Basket, BasketOrder } from '../../shared/models/basket.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  public basket: Basket;
  // public basketOrderView: [[order :BasketOrder], number]= [];

  constructor(private basketService: BasketService) {
    this.basket = basketService.basket;

    // basketService.basket.products.map((item) => {
    //   this.basketOrderView
    // })
  }

  removeProduct(id: string) {
    this.basket.removeProduct(id);
  }

  ngOnInit(): void {}
}
