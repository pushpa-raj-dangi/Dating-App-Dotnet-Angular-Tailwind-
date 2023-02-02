import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberDetailComponent } from './member-detail/member-detail.component';

@NgModule({
  declarations: [MemberListComponent, MemberCardComponent, MemberDetailComponent],
  imports: [CommonModule, MembersRoutingModule, SharedModule],
})
export class MembersModule {}
