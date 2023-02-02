import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  members$ = (): Observable<Member[]> =>
    this.http.get<Member[]>(this.apiUrl + 'users');

  member$(username: Observable<string>): Observable<Member> {
    console.log(username);

    return username.pipe(
      switchMap((username) =>
        this.http.get<Member>(this.apiUrl + 'users/' + username)
      )
    );
  }
}
