import { User } from 'src/app/components/account/models/user.interface';
import { UserParams } from 'src/app/core/models/user-params';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { MembersService } from 'src/app/core/services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/core/models/member';
import { RouterAnimations } from 'src/app/core/animations/router.animation';
import { Pagination } from 'src/app/core/models/pagination';
import { AccountService } from 'src/app/core/services/account.service';

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
  user: User;
  pageNumber = 10;
  pageSize = 1;

  genderList = [
    { key: 'male', value: 'Males' },
    { key: 'female', value: 'Females' },
  ];
  orderByList = [
    { key: 'lastActive', value: 'Last Active' },
    { key: 'created', value: 'Newest Member' },
  ];

  members: Member[];
  pagination: Pagination;
  userParams: UserParams;

  constructor(private memberService: MembersService, private router: Router) {
    this.userParams = this.memberService.getUserParams();
  }
  ngOnInit(): void {
    this.loadMembers();
  }

  toggleDetail(username: string) {
    this.router.navigate(['/members', username]);
  }

  resetFilter() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);

    this.memberService.members$(this.userParams).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(pageNumber: number) {
    console.log(this.pagination);

    this.userParams.pageNumber = pageNumber;
    this.memberService.setUserParams(this.userParams);
    this.pagination.currentPage;
    this.loadMembers();
  }
}
