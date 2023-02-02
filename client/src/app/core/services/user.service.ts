import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/components/account/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getUser$ = (username: string): Observable<User> =>
    this.http.get<User>(`${this.apiUrl}users/${username}`);
}
