import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/index';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-notification.component.html',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  constructor(private toastService: ToastService) {}

  ngOnInit() {}
}
