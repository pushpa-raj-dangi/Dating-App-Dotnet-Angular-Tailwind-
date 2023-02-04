import { AccountService } from 'src/app/core/services/account.service';
import { Member } from 'src/app/core/models/member';
import { PaginatedResult } from './../models/pagination';
import { Observable, map, of, switchMap, take } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { UserParams } from '../models/user-params';
import { User } from 'src/app/components/account/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private apiUrl = environment.API_URL;
  private allUsers$: Observable<Member[]> = of([]);

  memberCache = new Map();
  userParams: UserParams;
  user: User;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }
  // members$(page?: number, itemPerPage?: number): Observable<Member[]> {
  //   let params = new HttpParams();
  //   // if (page !== null && itemPerPage !== null) {
  //   //   params = params.append('pageNumber', page.toString());
  //   //   params = params.append('pageSize', itemPerPage.toString());
  //   // }

  //   return this.allUsers$.pipe(
  //     switchMap((members: Member[]) => {
  //       if (members.length > 0) return of(members);
  //       return this.http.get<Member[]>(this.apiUrl + 'users').pipe(
  //         map((members) => {
  //           this.allUsers$ = of(members);
  //           return members;
  //         })
  //       );
  //     })
  //   );
  //   // return this.http.get<Member[]>(this.apiUrl + 'users').pipe(
  //   //   map((response: any) => {
  //   //     this.paginatedResult.result = response.body;
  //   //     if (response.headers.get('Pagination') !== null) {
  //   //       this.paginatedResult.pagination = JSON.parse(
  //   //         response.headers.get('Pagination')
  //   //       );
  //   //     }

  //   //     return this.paginatedResult;
  //   //   })
  //   // );
  // }

  members$(userParams: UserParams) {
    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    var response = this.memberCache.get(Object.values(userParams).join('-'));

    if (response) {
      return of(response);
    }

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPageinatedResult<Member[]>(
      this.apiUrl + 'users',
      params
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  // member$(username: Observable<string>): Observable<Member> {
  //   return username.pipe(
  //     switchMap((username: string) => {
  //       return this.allUsers$.pipe(
  //         map((members: Member[]) => {
  //           return members.find(
  //             (member: Member) => member.userName === username
  //           );
  //         })
  //       );
  //     }),
  //     switchMap((member: Member | undefined) => {
  //       if (member) {
  //         return of(member);
  //       } else {
  //         return username.pipe(
  //           switchMap((username) =>
  //             this.http.get<Member>(this.apiUrl + 'users/' + username)
  //           )
  //         );
  //       }
  //     })
  //   );
  // }

  // member$(username: Observable<string>): Observable<Member> {
  //   return username.pipe(
  //     switchMap((username: string) => {
  //       return this.allUsers$.pipe(
  //         map((members: Member[]) => {
  //           return members.find(
  //             (member: Member) => member.userName === username
  //           );
  //         })
  //       );
  //     }),
  //     switchMap((member: Member | undefined) => {
  //       if (member) {
  //         return of(member);
  //       } else {
  //         return username.pipe(
  //           switchMap((username) =>
  //             this.http.get<Member>(this.apiUrl + 'users/' + username)
  //           )
  //         );
  //       }
  //     })
  //   );
  // }

  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);
    if (member) {
      return of(member);
    }

    return this.http.get<Member>(this.apiUrl + 'users/' + username);
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

  updateMainPhoto(photoId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}users/set-main-photo/${photoId}`,
      {}
    );
  }

  deletePhoto(photoId: number) {
    return this.http.delete(`${this.apiUrl}users/delete-photo/${photoId}`);
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

  private getPageinatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response: any) => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get('Pagination')
          );
        }

        return paginatedResult;
      })
    );
  }
}
