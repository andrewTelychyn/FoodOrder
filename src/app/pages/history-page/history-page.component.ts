import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { BasketDTO } from 'src/app/shared/models/basket.model';

@Component({
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  public chosenCategory = undefined;
  public baskets: BasketDTO[];

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.baskets = [];

    if (this.router.url == '/history') {
      this.orderService
        .loadOrders(this.userService.user?.id!)
        .subscribe((data) => (this.baskets = data.reverse()));
    } else {
      this.route.params
        .pipe(
          filter((p) => p.userId),
          switchMap((p) => this.orderService.loadOrders(p.userId))
        )
        .subscribe((data) => (this.baskets = data.reverse()));
    }
  }

  ngOnInit(): void {}
}
