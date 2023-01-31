import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.log(error.error.errors, 'errororororor================>');

        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateError = [];

                for (const key in error.error.errors) {
                  if (key) {
                    modalStateError.push(error.error.errors[key]);
                  }
                  console.log(modalStateError.flat());
                }
                throw modalStateError.flat();
              } else {
                console.log('error', error.statusText, error.status);
              }
              break;
            case 401:
              console.log('error');
              break;
            case 404:
              console.log('404 error');

              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              console.log('Something unexpected wrong');

              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
