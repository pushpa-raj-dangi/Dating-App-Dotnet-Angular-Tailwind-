import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/core/models/member';
import { MembersService } from 'src/app/core/services/members.service';
import { RouterAnimations } from 'src/app/core/animations/router.animation';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
  animations: [RouterAnimations.routeSlide],
})
export class MemberDetailComponent implements OnInit {
  user$: Observable<Member>;
  userName$: Observable<string>;
  slide = RouterAnimations.routeSlide;

  constructor(
    private memberService: MembersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    this.userName$ = this.activatedRoute.params.pipe(
      map((username) => {
        return username['username'];
      })
    );
    this.user$ = this.memberService.member$(this.userName$);
  }
}
