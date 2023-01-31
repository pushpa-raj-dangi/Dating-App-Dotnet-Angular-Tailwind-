import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
