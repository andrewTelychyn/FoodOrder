import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { filter, map, tap, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public user: User | undefined;

  constructor(private http: HttpClient, private userService: UserService) {
    let value = localStorage.getItem('username');
    if (value) this.user = JSON.parse(value);
  }

  login(username: string, password: string) {
    console.log(username);

    return this.http.get<User[]>(environment.API + 'users').pipe(
      map((data) => data.filter((item) => item.username === username)),
      map((data) => {
        if (data.length === 0) throw new Error('No such user in database');
        if (data[0].password !== password) throw new Error('Wrong password');
        if (data.length > 1) throw new Error('Smth went wrong');

        if (data[0].token) {
          this.userService.setUser(data[0]);

          this.user = data[0];
        }

        return data;
      })
    );
  }

  logout() {
    this.user = undefined;
    this.userService.clearUser();
  }

  register(user: User) {
    this.user = user;
    this.userService.setUser(user);
    return this.http.post<User>(environment.API + `users`, user);
  }
}
