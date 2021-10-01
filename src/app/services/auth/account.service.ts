import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private userService: UserService) {
    let value = localStorage.getItem('user');
  }

  login(username: string, password: string) {
    return this.http.get<User[]>(environment.API + 'users').pipe(
      map((data) => data.filter((item) => item.username === username)),
      map((data) => {
        if (data.length === 0) throw new Error('No such user in database');
        if (data[0].password !== password) throw new Error('Wrong password');
        if (data.length > 1) throw new Error('Smth went wrong');

        if (data[0].token) {
          this.userService.setUser(data[0]);
        }

        return data;
      })
    );
  }

  logout() {
    this.userService.clearUser();
  }

  register(user: User) {
    this.userService.setUser(user);
    return this.http.post<User>(environment.API + `users`, user);
  }
}
