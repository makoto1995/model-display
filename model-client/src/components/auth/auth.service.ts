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
}
class User {
  userId = '';
  userName = '';
  userEmail = '';
  userPassword = '';
  userRole = '';
}

@Injectable()
export class AuthService {
  _currentUser: User = new User();
  @Output() currentUserChanged = new EventEmitter(true);
  userRoles = constants.userRoles || [];
  HttpClient;

  static parameters = [HttpClient];

  constructor(http: HttpClient) {
    this.HttpClient = http;

    if (localStorage.getItem('id_token')) {
      http.get<Result<User>>(`/api/users/me`, {
        observe: 'response',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
      }).subscribe(
        res => {
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
  login(user: User) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  /**
   * Delete access token and user info
   * @return {Promise}
   */
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('id_token');
    this.currentUser = new User();
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
