import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  error?: string;
}

@Component({
  selector: 'admin',
  template: require('./admin.html'),
  styles: [require('./admin.scss')],
})
export class AdminComponent {
  users: Object[];

  static parameters = [HttpClient];
  constructor(public httpClient: HttpClient) {
    this.reset();
  }

  reset() {
    this.httpClient.get<Result<User[]>>('http://localhost:9000/users/', {
      observe: 'response',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }).subscribe(
      res => {
        this.users = res.body.data;
      }
    );
  }

  modify(user, targetRole: string) {
    this.httpClient.put<Result<User>>('http://localhost:9000/users/' + user.userId + '/role',
      JSON.stringify({
        oldRole: user.userRole,
        newRole: targetRole
      }), {
        observe: 'response',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }).subscribe(
        res => {
          if (res.body.success === false) {
            console.log(res.body.error);
          }
          this.reset();
        }
      );
  }

  delete(user) {
    this.httpClient.delete<Result<User>>('http://localhost:9000/users/' + user.userId, {
      observe: 'response',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }).subscribe(
      () => {
        this.users.splice(this.users.indexOf(user), 1);
      }
    );
  }
}
