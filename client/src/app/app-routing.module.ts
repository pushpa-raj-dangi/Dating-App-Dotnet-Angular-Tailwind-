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
    path: 'server-error',
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
  {
    path: 'members/:username',
    loadChildren: () =>
      import('src/app/components/members/members.module').then(
        (m) => m.MembersModule
      ),
    data: { animation: 'routeSlide' },
  },
  {
    path: 'my/profile',
    loadChildren: () =>
      import('src/app/components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
    data: { animation: 'routeSlide' },
  },
  { path: 'likes', loadChildren: () => import('./components/likes/likes.module').then(m => m.LikesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
