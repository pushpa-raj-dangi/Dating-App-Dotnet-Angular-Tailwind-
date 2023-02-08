import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LikesRoutingModule } from './likes-routing.module';
import { LikesComponent } from './likes.component';
import { TimeAgoPipe } from 'src/app/core/pipes/time-ago.pipe';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LikesComponent, TimeAgoPipe],
  imports: [
    CommonModule,
    LikesRoutingModule,
    PaginationComponent,
    FormsModule,
    SharedModule,
  ],
})
export class LikesModule {}
