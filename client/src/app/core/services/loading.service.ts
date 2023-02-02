import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  requestCount = 0;

  isLoading = new Subject<boolean>();

  constructor() {}

  show() {
    this.requestCount++;
    this.isLoading.next(true);
  }

  idle() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.isLoading.next(false);
    }
  }
}
