import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { filter, map, tap, mergeMap } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log(username);

    return this.http.get<User[]>(environment.API + 'users').pipe(
      map((data) => data.filter((item) => item.username === username)),
      map((data) => {
        if (data.length === 0) throw new Error('No such user in database');
        if (data[0].password !== password) throw new Error('Wrong password');

        // let token = sign({ userId: data[0].id }, environment.TOKEN, {
        //   expiresIn: '3h',
        // });

        // let token = jwt.sign({}, environment.TOKEN, {
        //   algorithm: 'RS256',
        //   expiresIn: 120,
        //   subject: data[0].id,
        // });
        // console.log(token);

        return data;
      })
    );
  }

  logout() {}

  register(user: User) {
    return this.http.post<User>(environment.API + `users`, user);
  }
}
