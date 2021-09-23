import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Basket, BasketDTO } from 'src/app/shared/models/basket.model';

@Component({
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  public chosenCategory = undefined;
  public baskets: BasketDTO[];

  constructor(private orderService: OrderService) {
    this.baskets = [];
    this.orderService
      .loadOrders()
      .subscribe((data) => (this.baskets = data.reverse()));
  }

  ngOnInit(): void {}
}
