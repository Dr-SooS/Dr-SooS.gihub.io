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
    getProject(project_id: number): Observable<Project[]> {
      return this.http.get(
        this.host.host + 'api/projects/project',
        {params: new HttpParams().set('session', this.cookie.get('session')).set('project_id', project_id.toString())}
      );
    }
    createProject(title: string): Observable<Project> {
      return this.http.post(this.host.host + 'api/project/projects', {
        'session': this.cookie.get('session'),
        'Project': {'title': title}
      });
    }
    updateProject(id: number, title: string): Observable<Project> {
      return this.http.put(this.host.host + 'api/project/projects', {
        'session': this.cookie.get('session'),
        'Project': {'id': id, 'title': title}
      });
    }
    deleteProject(id: number): Observable<Project> {
      return this.http.delete(this.host.host + 'api/project/projects', {params: new HttpParams()
        .set('session', this.cookie.get('session'))
        .set('project_id', id.toString())});
    }
}
