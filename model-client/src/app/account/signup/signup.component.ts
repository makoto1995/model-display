// @flow
import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../../components/auth/auth.service';


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
  selector: 'signup',
  template: require('./signup.html')
})
export class SignupComponent {
  static parameters = [AuthService, Router];
  user: User = {
    userEmail: '',
    userPassword: '',
    userName: '',
    userId: '',
    userRole: ''
  };
  confirmPassword;
  errors = {};
  submitted = false;
  AuthService;
  Router;

  constructor(_AuthService_: AuthService, router: Router, public client: HttpClient) {
    this.AuthService = _AuthService_;
    this.Router = router;
  }

  register(user, event) {
    event.preventDefault();
    this.submitted = true;
    let body = JSON.stringify({userName: user.name, userEmail: user.email, userPassword: user.password});
    this.client.post<Result<User>>('api/users/', body, {
      observe: 'response',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).subscribe(
      res => {
        if (res.body.success = false) {
          this.errors = res.body.data;
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
    // return this.AuthService.createUser({
    //   userName: user.name,
    //   userEmail: user.email,
    //   userPassword: user.password
    // }, null)
    //   .then(() => {
    //     // Account created, redirect to home
    //     this.Router.navigateByUrl('/home');
    //   })
    //   .catch(err => {
    //     err = err.data;
    //     this.errors = {};
    //     // Update validity of form fields that match the sequelize errors
    //     if (err.name) {
    //       err.fields.forEach(field => {
    //         this.errors[field] = err.message;
    //       });
    //     }
    //   });
  }
}
