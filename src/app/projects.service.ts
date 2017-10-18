import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Project} from './project';
import {HostService} from './host.service';
import {CookieService} from 'ng2-cookies';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProjectsService {

    constructor(
        public cookie: CookieService,
        public http: HttpClient,
        public host: HostService
    ) {}

    getProjects(): Observable<Project[]> {
        return this.http.get(this.host.host + 'api/projects', {params: new HttpParams().set('session', this.cookie.get('session'))});
    }
}
