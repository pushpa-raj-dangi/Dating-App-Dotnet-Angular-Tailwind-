import { AccountService } from 'src/app/core/services/account.service';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { User } from 'src/app/components/account/models/user.interface';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: User;
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (currentUser = user));

    if (currentUser) {
      request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
