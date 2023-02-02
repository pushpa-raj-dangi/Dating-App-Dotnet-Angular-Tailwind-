import { Observable, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private apiUrl = environment.API_URL;
  private allUsers$: Observable<Member[]> = of([]);

  constructor(private http: HttpClient) {}

  members$(): Observable<Member[]> {
    return this.allUsers$.pipe(
      switchMap((members: Member[]) => {
        if (members.length > 0) return of(members);
        return this.http.get<Member[]>(this.apiUrl + 'users').pipe(
          map((members) => {
            this.allUsers$ = of(members);
            return members;
          })
        );
      })
    );
  }

  member$(username: Observable<string>): Observable<Member> {
    return username.pipe(
      switchMap((username: string) => {
        return this.allUsers$.pipe(
          map((members: Member[]) => {
            return members.find(
              (member: Member) => member.userName === username
            );
          })
        );
      }),
      switchMap((member: Member | undefined) => {
        if (member) {
          return of(member);
        } else {
          return username.pipe(
            switchMap((username) =>
              this.http.get<Member>(this.apiUrl + 'users/' + username)
            )
          );
        }
      })
    );
  }

  update$(member: Member): Observable<Member> {
    return this.http.put<Member>(this.apiUrl + 'users/', member).pipe(
      switchMap(() => {
        return this.allUsers$.pipe(
          map((members: Member[]) => {
            const index = members.findIndex(
              (m) => m.userName === member.userName
            );
            if (index !== -1) {
              members[index] = member;
            }
            return member;
          })
        );
      })
    );
  }
}
