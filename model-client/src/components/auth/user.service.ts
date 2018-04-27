// @flow
'use strict';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


type UserType = {
    userId?: string;
    userName?: string;
    userEmail?: string;
    userPassword?: string;
    userRole?: string;
};

function handleError(err) {
    return Observable.throw(err.json().error || 'Server error');
}

@Injectable()
export class UserService {
    AuthHttp;

    static parameters = [AuthHttp];
    constructor(private authHttp: AuthHttp) {
        this.AuthHttp = authHttp;
    }

    query(): Observable<UserType[]> {
        return this.AuthHttp.get('/api/users/')
            .catch(handleError);
    }
    get(user: UserType = {userId: 'me'}): Observable<UserType> {
        return this.AuthHttp.get(`/api/users/${user.userId}`)
            .catch(handleError);
    }
    create(user: UserType) {
        return this.AuthHttp.post('/api/users/', user)
            .catch(handleError);
    }
    remove(user) {
        return this.AuthHttp.delete(`/api/users/${user.userId}`)
            .catch(handleError);
    }
}
