import { Observable, map, take } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/core/services/members.service';
import { Member } from 'src/app/core/models/member';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  userName$: Observable<string>;
  form: FormGroup;
  member$: Observable<Member>;
  type = 'detail';
  message: string;
  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAccountDetail();
  }

  getAccountDetail() {
    this.member$ = this.memberService.member$(this.userName$).pipe(take(1));
    this.buildMemberForm();
    this.patchMemberForm();
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

  private buildMemberForm(): void {
    this.form = this.fb.group({
      introduction: [],
      lookingFor: [],
      interests: [],
      city: [],
      country: [],
    });
  }

  private patchMemberForm(): void {
    this.member$
      .pipe(
        take(1),
        map((member: Member) => {
          this.form.patchValue(member);
        })
      )
      .subscribe();
  }

  updateInfo(): void {
    this.memberService
      .update$(this.form.value)
      .pipe(
        take(1),
        map(() => {
          this.message = 'User update successfully';
          setTimeout(() => {
            this.message = null;
          }, 1500);
        })
      )
      .subscribe();
  }
}
