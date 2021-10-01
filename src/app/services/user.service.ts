import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: BehaviorSubject<User | undefined>;

  constructor(private http: HttpClient) {
    let value: User = JSON.parse(localStorage.getItem('user')!);
    this.user = new BehaviorSubject<User | undefined>(value);
  }

  public setUser(user: User) {
    this.user.next(user);

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', user.id);
    localStorage.setItem('token', user.token!);
  }

  public clearUser() {
    this.user.next(undefined);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }

  public updateInfo(user: User, callback: (data: string) => void): void {
    this.http
      .put<User>(environment.API + `users/${user.id}`, user)
      .pipe(take(1))
      .subscribe(
        () => {
          this.setUser(user);
          callback('Information is successfully updated!');
        },
        (error) => {
          let message = error.message || 'Something went wrong';
          callback(message);
        }
      );
  }
}
