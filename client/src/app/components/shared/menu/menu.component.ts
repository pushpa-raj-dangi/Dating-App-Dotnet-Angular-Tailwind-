import { Observable } from 'rxjs';
import { User } from 'src/app/components/account/models/user.interface';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  currentUser$!: Observable<User>;
  isLoggedIn$!: Observable<boolean>;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isLoggedIn$ = this.accountService.isLoggedIn$;
  }

  logout() {
    this.accountService.logout();
  }
}
