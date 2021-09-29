import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/shared/models/user.model';
import { BasketService } from '../../services/basket.service';
import { Basket, BasketOrder } from '../../shared/models/basket.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  public basket$: BehaviorSubject<Basket>;
  public form: FormGroup;
  public submitted: boolean = false;

  constructor(
    private userSerice: UserService,
    private basketService: BasketService,
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.basket$ = this.basketService.basket$;
    let user = this.userSerice.user.getValue();

    this.form = this.formBuilder.group({
      firstName: [user?.firstname, Validators.required],
      lastName: [user?.lastname, Validators.required],
      phone: ['', [Validators.minLength(8), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
    });

    console.log(userSerice.user);
  }

  public get f() {
    return this.form.controls;
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
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.basket$.getValue().products.length == 0) return;

    let user: UserDTO = {
      id: this.userSerice.user.getValue()?.id!,
      firstname: this.f.firstName.value,
      lastname: this.f.lastName.value,
      phone: this.f.phone.value,
      email: this.f.email.value,
    };

    this.orderService
      .saveOrder(this.basket$.getValue(), user)
      .subscribe((data) => {
        this.basketService.clearAll();
        this.router.navigate(['menu/burger']);
      });
  }

  ngOnInit(): void {}
}
