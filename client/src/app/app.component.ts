import { User } from './components/account/models/user.interface';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  private setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) this.accountService.setCurrentUser(user);
  }
}
