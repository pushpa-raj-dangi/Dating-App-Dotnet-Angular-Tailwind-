import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'error',
    component: TestErrorComponent,
  },
  {
    path: 'account',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('src/app/components/account/account.module').then(
        (m) => m.AccountModule
      ),
  },
  {
    path: 'members',
    loadChildren: () =>
      import('src/app/components/members/members.module').then(
        (m) => m.MembersModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
