import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasketService } from '../../services/basket.service';
import { Basket, BasketOrder } from '../../shared/models/basket.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  public basket$: BehaviorSubject<Basket>;

  // public basket: Basket;
  // public basketOrderView: [[order :BasketOrder], number]= [];

  constructor(private basketService: BasketService) {
    this.basket$ = this.basketService.basket$;

    // this.basket = basketService.basket;

    // basketService.basket.products.map((item) => {
    //   this.basketOrderView
    // })
  }

  removeProduct(id: string) {
    // this.basket.removeProduct(id);
    this.basketService.removeProduct(id);
  }

  increase(prod: BasketOrder) {
    this.basketService.increaseOne(prod);
  }

  decrease(prod: BasketOrder) {
    this.basketService.decreaseOne(prod);
  }

  clear() {
    this.basketService.clearAll();
  }

  ngOnInit(): void {}
}
