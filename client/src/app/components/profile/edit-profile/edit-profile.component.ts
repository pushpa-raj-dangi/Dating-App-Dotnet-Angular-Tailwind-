import { Observable, map, take } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/core/services/members.service';
import { Member } from 'src/app/core/models/member';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userName$: Observable<string>;
  member$: Observable<Member>;
  type = 'detail';
  constructor(
    private accountService: AccountService,
    private memberService: MembersService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAccountDetail();
  }

  getAccountDetail() {
    this.member$ = this.memberService.member$(this.userName$).pipe(take(1));
  }

  getUser() {
    this.userName$ = this.accountService.currentUser$.pipe(
      map((userName) => {
        return userName.userName;
      })
    );
  }

  toggle(type: string) {
    this.type = type;
  }
}
