import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { AccountService } from 'src/app/services/auth/account.service';
import { RoleGuardService } from 'src/app/services/auth/roleguard.service';
import { UserService } from 'src/app/services/user.service';
import { CategoriesState, MainState } from 'src/app/store/shared/store.model';
import { Category } from '../../models/product.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @Input() chosenCategory: Category | undefined;
  public username!: string;
  public store$: Observable<MainState>;
  public isAdmin: boolean;
  public isAdmimPage: boolean;

  constructor(
    private userService: UserService,
    public router: Router,
    private store: Store<{ main: MainState }>,
    public roleGuard: RoleGuardService
  ) {
    this.store$ = this.store.select('main');

    this.userService.user.subscribe((u) => (this.username = u?.username!));

    this.isAdmin = this.roleGuard.checkRole('admin');
    this.isAdmimPage = this.router.url.split('/')[1] == 'admin';
  }
}
