import { MembersService } from 'src/app/core/services/members.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from 'src/app/core/models/member';
import { ToastService } from 'src/app/shared/services';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent {
  constructor(
    private memberService: MembersService,
    private toastService: ToastService
  ) {}
  @Input() member: Member;
  @Output() toggleDetail: EventEmitter<string> = new EventEmitter<string>();
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  getMonthName(date: Date) {
    const convertedDate = new Date(date);

    return this.monthNames[convertedDate.getMonth()]; // Returns 'June'
  }

  toggleDetailFromChild(username: string) {
    this.toggleDetail.emit(username);
  }

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe(() => {
      console.log('You liked' + member.userName);
    });
  }
}
