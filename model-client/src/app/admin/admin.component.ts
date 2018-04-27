import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
  token?: string;
}

@Component({
  selector: 'admin',
  template: require('./admin.html'),
  styles: [require('./admin.scss')],
})
export class AdminComponent {
  users: Object[];

  constructor( public httpClient: HttpClient) {
    // Use the user service to fetch all users
    this.httpClient.get<Result<User[]>>('/api/users/', {
      observe: 'response',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).subscribe(
      res => {
        this.users = res.body.data;
      }
    );
  }

  delete(user) {
    this.httpClient.delete<Result<User>>('/api/users/${user.userId}', {
      observe: 'response',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).subscribe(
      () => {
        this.users.splice(this.users.indexOf(user), 1);
      }
    );
  }
}
