///<reference path="user.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './user';
import {HostService} from './host.service';
import {CookieService} from 'ng2-cookies';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
    constructor(public http: HttpClient, public host: HostService, public cookie: CookieService) {
    }
    registerUser(): Observable<string> {
        return this.http.get(this.host.host + 'api/signup');
    }

    public getUser(): Observable<User> {
        if (!this.cookie.check('session')) {
            this.registerUser().subscribe(data => {
                this.cookie.set('session', data['session']);
                return this.http.get(this.host.host + 'api/account', {params: new HttpParams().set('session', this.cookie.get('session'))});
            });
        } else {
            return this.http.get(this.host.host + 'api/account', {params: new HttpParams().set('session', this.cookie.get('session'))});
        }
    }
}
