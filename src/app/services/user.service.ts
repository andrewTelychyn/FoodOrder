import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  public updateInfo(user: User): Observable<User> {
    this.setUser(user);
    return this.http.put<User>(environment.API + `users/${user.id}`, user);
  }
}
