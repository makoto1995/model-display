// @flow
import {EventEmitter, Injectable, Output} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {HttpClient} from '@angular/common/http';

import {safeCb} from '../util';
import constants from '../../app/app.constants';


interface Result<T> {
  success: boolean;
  data: T;
  token: string;
  error: string;
}
interface User {
  userEmail: string;
  userName: string;
  userPassword: string;
  userId: string;
  userRole: string;
}
// class User {
//   userId = '';
//   userName = '';
//   userEmail = '';
//   userPassword = '';
//   userRole = '';
// }

@Injectable()
export class AuthService {
  _currentUser: User = {
    userEmail: '',
    userPassword: '',
    userName: '',
    userId: '',
    userRole: ''
  };
  @Output() currentUserChanged = new EventEmitter(true);
  userRoles = constants.userRoles || [];
  HttpClient;

  static parameters = [HttpClient];

  constructor(http: HttpClient) {
    this.HttpClient = http;

    if (localStorage.getItem('id_token')) {
      http.get<Result<User>>('http://localhost:9000/users/me', {
        observe: 'response',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
      }).subscribe(
        res => {
          if (res.body.success === false) {
            console.log(res.body.error);
            throw res.body.error;
          }
          this.currentUser = res.body.data;
        },
        error => {
          console.log(error);
          localStorage.removeItem('id_token');
        });
    }
  }

  /**
   * Check if userRole is >= role
   * @param {String} userRole - role of current user
   * @param {String} role - role to check against
   */
  static hasRole(userRole, role) {
    return constants.userRoles.indexOf(userRole) >= constants.userRoles.indexOf(role);
  }

  get currentUser() {
    return this._currentUser;
  }

  set currentUser(user) {
    this._currentUser = user;
    this.currentUserChanged.emit(user);
  }

  /**
   * Authenticate user and save token
   *
   * @param  {Object}   user     - login info
   * @return {Promise}
   */
  public login(user: User) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  /**
   * Delete access token and user info
   * @return {Promise}
   */
  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('id_token');
    this.currentUser = {
      userEmail: '',
      userPassword: '',
      userName: '',
      userId: '',
      userRole: ''
    };
    return Promise.resolve();
  }

  /**
   * Gets all available info on a user
   *
   * @param  {Function} [callback] - function(user)
   * @return {Promise}
   */
  getCurrentUser(callback?) {
    safeCb(callback)(this.currentUser);
    return Promise.resolve(this.currentUser);
  }

  /**
   * Gets all available info on a user
   *
   * @return {Object}
   */
  getCurrentUserSync() {
    return this.currentUser;
  }

  /**
   * Checks if user is logged in
   * @param {function} [callback]
   * @returns {Promise}
   */
  isLoggedIn(callback?) {
    let is = !!this.currentUser.userId;
    console.log(this.currentUser.userId);
    console.log((is) ? 1 : 0);
    console.log(this.currentUser);
    safeCb(callback)(is);
    return Promise.resolve(is);
  }

  /**
   * Checks if user is logged in
   * @returns {Boolean}
   */
  isLoggedInSync() {
    return !!this.currentUser.userId;
  }

  /**
   * Check if a user is an admin
   *
   * @param  {Function|*} [callback] - optional, function(is)
   * @return {Promise}
   */
  isAdmin(callback?) {
    return this.getCurrentUser().then(user => {
      var is = user.userRole === 'admin';
      safeCb(callback)(is);
      return is;
    });
  }

  isAdminSync() {
    return this.currentUser.userRole === 'admin';
  }

  /**
   * Get auth token
   *
   * @return {String} - a token string used for authenticating
   */
  getToken() {
    return localStorage.getItem('id_token');
  }
}
