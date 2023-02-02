import { LoadingService } from './../services/loading.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private lodingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.lodingService.show();
    console.log(req, 'requested');

    return next.handle(req).pipe(
      delay(1000),
      finalize(() => {
        this.lodingService.idle();
      })
    );
  }
}