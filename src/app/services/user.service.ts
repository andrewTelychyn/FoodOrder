import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User | undefined;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  public setUser(user: User) {
    this.user = user;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', user.id);
    localStorage.setItem('token', user.token!);
  }

  public clearUser() {
    this.user = undefined;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }
}
