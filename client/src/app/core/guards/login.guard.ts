import { AccountService } from 'src/app/core/services/account.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AccountService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      }),
      tap((canActivate) => {
        console.log('navigate');
        if (!canActivate) {
          this.router.navigate(['/account/'], {
            queryParams: { type: 'login' },
          });
        }
      })
    );
  }
}
