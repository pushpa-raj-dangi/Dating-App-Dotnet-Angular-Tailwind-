import { ToastService } from 'src/app/shared/services/toast.service';
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
  constructor(private router: Router, private toastService: ToastService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
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
                  this.toastService.addAll([
                    { type: 'error', text: modalStateError.flat()[0] },
                  ]);
                }
                throw modalStateError.flat();
              } else {
                console.log('error', error.statusText, error.status);
                this.toastService.add({
                  type: 'error',
                  text: error.statusText,
                });
              }
              break;
            case 401:
              this.toastService.add({
                type: 'error',
                text: error,
              });
              break;
            case 404:
              this.toastService.add({
                type: 'error',
                text: error,
              });

              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              this.toastService.add({
                type: 'error',
                text: error,
              });

              break;

            default:
              const navigationExtras1: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras1);
              this.toastService.add({
                type: 'error',
                text: 'Unexpected happen with server !',
              });

              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
