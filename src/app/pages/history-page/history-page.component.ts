import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { BasketDTO } from 'src/app/shared/models/basket.model';

@Component({
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  public chosenCategory = undefined;
  // public baskets: BasketDTO[];

  public baskets: { basket: BasketDTO; toShow: boolean }[];

  public basketsKeyMap: {
    [id: string]: { basket: BasketDTO; toShow: boolean };
  } = {};

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.baskets = [];

    if (this.router.url == '/history') {
      this.orderService
        .loadOrders(this.userService.user.getValue()?.id!)
        .pipe(take(1))
        .subscribe((data) =>
          data
            .reverse()
            .map((basket) => this.baskets.push({ toShow: false, basket }))
        );
    } else {
      this.route.params
        .pipe(
          filter((p) => p.userId),
          switchMap((p) => this.orderService.loadOrders(p.userId)),
          take(1)
        )
        .subscribe((data) => {
          data
            .reverse()
            .map((basket) => this.baskets.push({ toShow: false, basket }));
        });
    }
  }

  public openClose(id: string) {
    this.baskets = this.baskets.map((b) =>
      b.basket.id == id ? { ...b, toShow: !b.toShow } : b
    );
  }

  ngOnInit(): void {}
}
