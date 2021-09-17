import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/auth/account.service';
import { Category } from '../../models/product.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @Input() chosenCategory: Category | undefined;
  public username: string;

  constructor(private accountService: AccountService, private router: Router) {
    this.username = accountService.user?.username || '';
  }

  public logout() {
    this.accountService.logout();
    this.router.navigate(['login']);
  }
}
