import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { BasketService } from '../../services/basket.service';
import { Basket, BasketOrder } from '../../shared/models/basket.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  public basket$: BehaviorSubject<Basket>;

  constructor(
    private basketService: BasketService,
    private orderService: OrderService
  ) {
    this.basket$ = this.basketService.basket$;
  }

  public removeProduct(id: string) {
    this.basketService.removeProduct(id);
  }

  public increase(prod: BasketOrder) {
    this.basketService.increaseOne(prod);
  }

  public decrease(prod: BasketOrder) {
    this.basketService.decreaseOne(prod);
  }

  public purchase() {
    this.orderService
      .saveOrder(this.basket$.getValue())
      .subscribe((data) => console.log(data));
  }

  ngOnInit(): void {}
}
