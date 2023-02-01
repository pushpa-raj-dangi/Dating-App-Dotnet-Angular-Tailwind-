import { Observable } from 'rxjs';
import { MembersService } from 'src/app/core/services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/core/models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]>;
  constructor(private memberService: MembersService) {}
  ngOnInit(): void {
    this.loadMembers();
  }

  private loadMembers() {
    this.members$ = this.memberService.members$();
  }
}
