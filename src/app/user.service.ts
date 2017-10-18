///<reference path="user.ts"/>
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(public http: HttpClient) { }

  getUser(): Promise<User> {
    return this.http.get('sfdsfasdf').
  }

}
