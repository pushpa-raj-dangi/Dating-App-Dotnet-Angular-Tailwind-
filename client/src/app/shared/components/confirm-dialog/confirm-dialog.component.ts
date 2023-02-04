import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full">
      <button
        class="bg-red-700 rounded-full shadow-md px-4 py-2"
        (click)="openConfirm()"
      >
        {{ btnText }}
      </button>
      <div
        class="shadow-md bg-white absolute bottom-0 w-auto  left-0 shadow-slate-600 rounded-md flex  flex-col text-black p-3"
        *ngIf="showConfirm"
      >
        <div>{{ title }}</div>
        <div class="flex bg-white mt-2 justify-end">
          <button
            class="bg-red-400  shadow-sm shadow-lime-900 rounded-md px-3 text-white"
            (click)="confirm()"
          >
            Yes
          </button>
          <button
            class="bg-slate-400 shadow-sm shadow-lime-900 rounded-md ml-2 px-3 text-white"
            (click)="reject()"
          >
            No
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .box {
        display: flex;
        background: white;
        padding: 10px;
        box-shadow: 1px 5px 6px 3px #00000059;
        border-radius: 6px;
        flex-direction: column;
      }
      .btns {
        display: flex;
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  showConfirm = false;
  private confirmData = new BehaviorSubject<boolean>(false);
  confirm$ = this.confirmData.asObservable();

  @Input() title: string;
  @Input() btnText: string;
  @Output() confirmation = new EventEmitter<any>();

  openConfirm() {
    this.showConfirm = true;
  }

  confirm() {
    this.showConfirm = false;
    this.confirmData.next(true);
    this.confirmation.emit(this.confirm$);
  }

  reject() {
    this.showConfirm = false;
    this.confirmation.emit(this.confirm$);
    this.confirmData.next(false);
  }
}
