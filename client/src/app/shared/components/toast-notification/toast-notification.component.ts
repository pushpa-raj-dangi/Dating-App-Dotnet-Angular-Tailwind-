import { Message } from './../../interfaces/message.interface';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { interval, take, timer } from 'rxjs';
import { ToastService } from 'src/app/shared/services/index';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-notification.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [``],
  animations: [
    trigger('messageState', [
      state(
        'visible',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({ transform: '{{showTransformParams}}', opacity: 0 }),
        animate('{{showTransitionParams}}'),
      ]),
      transition('* => void', [
        animate(
          '{{hideTransitionParams}}',
          style({
            height: 0,
            opacity: 0,
            transform: '{{hideTransformParams}}',
          })
        ),
      ]),
    ]),
  ],
})
export class ToastNotificationComponent implements OnInit {
  @Input() message: Message;
  @Input() type: string;
  show = false;
  width: number;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.messageObserver.subscribe((x: Message) => {
      this.message = x;
      this.show = true;
      this.type = x.type;
      console.log(x);
    });
    interval(6000)
      .pipe(take(1))
      .subscribe((x) => {
        this.show = false;
      });
  }

  hide() {
    this.show = false;
  }
}
