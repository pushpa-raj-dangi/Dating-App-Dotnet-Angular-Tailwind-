import { Component, Input } from '@angular/core';
import { Member } from 'src/app/core/models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent {
  @Input() member: Member;

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
}
