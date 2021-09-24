import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/auth/account.service';
import { RoleGuardService } from 'src/app/services/auth/roleguard.service';
import { Category, ProductsState } from '../../models/product.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @Input() chosenCategory: Category | undefined;
  public username: string;
  public store$: Observable<ProductsState>;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private store: Store<{ main: ProductsState }>,
    public roleGuard: RoleGuardService
  ) {
    this.username = accountService.user?.username || '';
    this.store$ = this.store.select('main');
  }

  public isSelected(category: Category) {
    return { 'tile-selected': category.value == this.chosenCategory?.value };
  }

  public logout() {
    this.accountService.logout();
    this.router.navigate(['account/login']);
  }
}
