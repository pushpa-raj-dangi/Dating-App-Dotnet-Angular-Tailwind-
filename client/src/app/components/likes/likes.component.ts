import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/core/models/member';
import { Pagination } from 'src/app/core/models/pagination';
import { MembersService } from 'src/app/core/services/members.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit {
  members: any;
  predicate = 'liked';
  options = [
    { key: 'liked', value: 'Liked By Me' },
    { key: 'likedBy', value: 'Who like me' },
  ];
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadLikes();
  }

  selectChange() {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(page: number) {
    this.pageNumber = page;
    this.loadLikes();
  }
}
