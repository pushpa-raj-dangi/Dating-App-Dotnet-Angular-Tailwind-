import { environment } from 'src/environments/environment';
import { User } from 'src/app/components/account/models/user.interface';
import { Login } from 'src/app/components/account/models/login.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiUrl = environment.API_URL;
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login$ = (user: Login) =>
    this.http.post(`{this.apiUrl}account/login`, user).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this._isLoggedIn.next(true);
        }
      })
    );

  register$ = (user: Login) =>
    this.http.post(`${this.apiUrl}account/register`, user).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this._isLoggedIn.next(true);
        }
      })
    );

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
    this._isLoggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('user');
    this._isLoggedIn.next(null);

    this.currentUserSource.next(null);
    window.location.reload();
  }
}
