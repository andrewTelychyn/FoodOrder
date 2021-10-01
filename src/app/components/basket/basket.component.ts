import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';
import { Basket } from '../../shared/models/basket.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  public basket$: BehaviorSubject<Basket>;

  constructor(private basketService: BasketService) {
    this.basket$ = this.basketService.basket$;
  }
}
