import { TimeAgoPipe } from './../../core/pipes/time-ago.pipe';
import { PaginationComponent } from './../../shared/components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberDetailComponent } from './member-detail/member-detail.component';

@NgModule({
  declarations: [
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    SharedModule,
  ],
})
export class MembersModule {}
