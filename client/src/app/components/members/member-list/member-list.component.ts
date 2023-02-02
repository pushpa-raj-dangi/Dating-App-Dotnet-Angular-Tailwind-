import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MembersService } from 'src/app/core/services/members.service';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/core/models/member';
import { RouterAnimations } from 'src/app/core/animations/router.animation';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  animations: [RouterAnimations.routeSlide],
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]>;
  username: string;

  user$: Observable<Member>;

  constructor(private memberService: MembersService, private router: Router) {}
  ngOnInit(): void {
    this.loadMembers();
  }

  private loadMembers() {
    this.members$ = this.memberService.members$();
  }

  toggleDetail(username: string) {
    this.router.navigate(['/members', username]);
  }
}
