import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Task} from './task';
import {HostService} from './host.service';
import {CookieService} from 'ng2-cookies';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TasksService {

    constructor(public cookie: CookieService,
                public http: HttpClient,
                public host: HostService) {
    }

    getTasks(project_id: number): Observable<Task[]> {
        return this.http.get(
            this.host.host + 'api/tasks',
            {params: new HttpParams().set('session', this.cookie.get('session')).set('project_id', project_id.toString())});
    }
}
