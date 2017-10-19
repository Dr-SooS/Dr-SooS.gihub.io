import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
            {params: new HttpParams().set('session', this.cookie.get('session')).set('project_id', project_id.toString())}
        );
    }

    getTask(task_id: number): Observable<Task[]> {
        return this.http.get(
            this.host.host + 'api/tasks/task',
            {params: new HttpParams().set('session', this.cookie.get('session')).set('task_id', task_id.toString())}
        );
    }

    createTask(title: string, desc: string, project_id: number): Observable<Task> {
        return this.http.post(this.host.host + 'api/tasks/task', {
            'session': this.cookie.get('session'),
            'Project': {'id': project_id},
            'Task': {'title': title, 'description': desc}
        });
    }

    updateTask(title: string, desc: string, id: number): Observable<Task> {
        return this.http.put(this.host.host + 'api/tasks/task', {
            'session': this.cookie.get('session'),
            'Task': {'id': id, 'title': title, 'description': desc}
        });
    }

    deleteTask(id: number): Observable<Task> {
        return this.http.delete(this.host.host + 'api/tasks/task', {
            params: new HttpParams()
                .set('session', this.cookie.get('session'))
                .set('task_id', id.toString())
        });
    }
}
