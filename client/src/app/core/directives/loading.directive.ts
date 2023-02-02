import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
  Input,
} from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appLoading]',
})
export class LoadingDirective implements OnDestroy {
  private subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private http: HttpClient
  ) {}

  @Input()
  set appLoading(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);

      this.subscription = this.http
        .get('https://jsonplaceholder.typicode.com/posts/1')
        .subscribe((event: any) => {
          if (event.type === HttpEventType.Sent) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
          if (event.type === HttpEventType.Response) {
            this.viewContainer.clear();
          }
        });
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
