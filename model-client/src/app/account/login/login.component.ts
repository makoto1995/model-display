import { NavbarComponent } from './../../../components/navbar/navbar.component';
// @flow
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../components/auth/auth.service';
import { Router } from '@angular/router';

interface User {
  userEmail: string;
  userName: string;
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
  selector: 'login',
  template: require('./login.html'),
  styles: [require('./login.scss')],
})
export class LoginComponent {
  user: User = {
    userEmail: '',
    userPassword: '',
    userName: '',
    userId: '',
    userRole: ''
  };
  errors = { login: undefined };
  submitted = false;
  Router;
  AuthService;
  NavbarComponent;
  static parameters = [AuthService, Router, HttpClient, NavbarComponent];
  constructor(public authService: AuthService, router: Router, public client: HttpClient, navbarComponent: NavbarComponent) {
    this.Router = router;
    this.AuthService = authService;
    this.NavbarComponent = navbarComponent;
  }

  login() {
    let email = this.user.userEmail;
    let password = this.user.userPassword;
    let body = JSON.stringify({
      userEmail: email,
      userPassword: password
    });
    this.submitted = true;
    this.client.post<Result<User>>('http://localhost:9000/users/login', body, {
      observe: 'response',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }).subscribe(
      res => {
        if (res.body.success === false) {
          this.errors.login = res.body.data;
          return;
        }
        localStorage.setItem('id_token', res.body.token);
        console.log(res);
        this.AuthService.login(res.body.data);
        this.AuthService.isLoggedIn().then(
          is => console.log(is)
        );

        this.NavbarComponent.reset();
        this.Router.navigateByUrl('/home');
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
    );
  }
}
