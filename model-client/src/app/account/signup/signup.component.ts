// @flow
import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../../components/auth/auth.service';

interface User {
  userEmail: string;
  username: string;
  userPassword: string;
  userId: string;
  userRole: string;
}

interface Result<T> {
  success: boolean;
  data: T;
  token: string;
}

@Component({
  selector: 'signup',
  template: require('./signup.html')
})
export class SignupComponent {
  user: User = {
    userEmail: '',
    userPassword: '',
    username: '',
    userId: '',
    userRole: ''
  };
  confirmPassword;
  errors = {};
  submitted = false;
  AuthService;
  Router;
  static parameters = [AuthService, Router, HttpClient];
  constructor(_AuthService_: AuthService, router: Router, public client: HttpClient) {
    this.AuthService = _AuthService_;
    this.Router = router;
  }

  register(user) {
    this.submitted = true;
    let body = JSON.stringify({
      userEmail: user.email,
      username: user.name,
      userPassword: user.password,
      userId: '',
      userRole: ''
    });
    console.log(body);
    this.client.post<Result<User>>('http://localhost:9000/users/', body, {
      observe: 'response',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).subscribe(
      res => {
        console.log(res);
        if (res.body.success = false) {
          this.errors = {serverSide: '注册失败!'};
          return;
        }
        localStorage.setItem('id_token', res.body.token);
        console.log(res.body.token);
        this.AuthService.login(res.body.data);
        this.Router.navigateByUrl('/home');
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }
}
