// @flow
import {Component} from '@angular/core';
import {AuthService} from '../../../components/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Result<T> {
  success: boolean;
  data: T;
  token: string;
}

interface User {
  userEmail: string;
  userName: string;
  userPassword: string;
  userId: string;
  userRole: string;
}

@Component({
  selector: 'settings',
  template: require('./settings.html'),
})
export class SettingsComponent {
  user: ChangePasswordDto = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errors = {other: undefined};
  message = '';
  submitted = false;
  AuthService;
  Router;

  static parameters = [AuthService];

  constructor(_AuthService_: AuthService, public client: HttpClient, router: Router) {
    this.AuthService = _AuthService_;
    this.Router = router;
  }

  changePassword(form) {
    if (form.invalid) {
      return;
    }

    this.submitted = true;

    this.client.put<Result<User>>('/api/users/${user.userId}/password', {
      oldPassword: this.user.oldPassword,
      newPassword: this.user.newPassword,
    },{
      observe: 'response',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).subscribe(
      res => {
        if (res.body.success = false) {
          this.errors.other = 'Incorrect password';
          console.log(res.body.data);
          return;
        }
        this.message = 'Password successfully changed.';
        this.Router.navigateByUrl('/home');
      }
    );
  }
}
