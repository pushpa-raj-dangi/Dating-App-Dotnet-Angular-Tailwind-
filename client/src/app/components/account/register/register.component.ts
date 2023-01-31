import { User } from './../models/user.interface';
import { AccountService } from 'src/app/services/account.service';
import {
  LOGIN,
  LOGIN_BTN_TEXT,
  LOGIN_TEXT,
  REGISTER,
  REGISTER_BTN_TEXT,
  REGISTER_TEXT,
} from 'src/app/constants/app.constants';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import ConfirmPasswordValidation from 'src/app/components/shared/utils/confirm-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  show = true;
  type = LOGIN;
  loginType = LOGIN;
  registerType = REGISTER;
  login_text = LOGIN_TEXT;
  register_text = REGISTER_TEXT;
  loginBtnText = LOGIN_BTN_TEXT;
  registerBtnText = REGISTER_BTN_TEXT;

  login!: FormGroup;
  register!: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.buildLoginForm();
    this.getUser();
    this.buildRegisterForm();
  }

  loginHandler(): void {
    this.accountService.login$(this.login.value).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      () => {}
    );
  }

  hideShow(): void {
    this.show = !this.show;
  }

  changeType(type: string): void {
    this.router.navigate(['account'], { queryParams: { type: type } });
  }

  private getParams(): void {
    this.route.queryParams.subscribe((type) => {
      this.type = type['type'];
      console.log(
        !(this.type === this.loginType || this.type === this.registerType)
      );

      if (!(this.type === this.loginType || this.type === this.registerType))
        this.type = this.loginType;
    });
  }

  private buildLoginForm(): void {
    this.login = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
    });
  }

  registerHandler() {
    this.accountService.register$(this.register.value).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      () => {}
    );
  }

  private buildRegisterForm(): void {
    this.register = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [
          ConfirmPasswordValidation.match('password', 'confirmPassword'),
        ],
      }
    );
  }

  private getUser(): void {
    this.userService.getUsers$.subscribe((x) => {
      console.log(x);
    });
  }

  private setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }

  get loginForm(): { [key: string]: AbstractControl } {
    return this.login.controls;
  }
  get registerForm(): { [key: string]: AbstractControl } {
    return this.register.controls;
  }
}
