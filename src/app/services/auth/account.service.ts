import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { filter, map, tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public user: User | undefined;

  constructor(private http: HttpClient) {
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
          console.log(data[0].token);

          localStorage.setItem('token', data[0].token);
          localStorage.setItem('username', JSON.stringify(data[0]));

          this.user = data[0];
        }

        return data;
      })
    );
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  register(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post<User>(environment.API + `users`, user);
  }
}
