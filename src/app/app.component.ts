import {Component, OnInit, ElementRef, ViewChild, Inject} from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { User } from './user';
import { Project } from './project';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  providers: [ CookieService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  host = 'http://cheephs.pythonanywhere.com/';
  user: User;
  projects: Project[];
  newProjectTitle: string;

  createProject() {
    this.http.post(
      this.host + 'api/projects/project',
      {'session': this.cookieService.get('session'), 'Project': {'title': this.newProjectTitle}}).subscribe(data => {
        this.http.get(
          this.host + 'api/projects',
          {params: new HttpParams().set('session', this.cookieService.get('session'))
          }).subscribe(data => {
          this.projects = data['projects'] as Project[];
        });
    });
  }

  constructor( public cookieService: CookieService, private http: HttpClient) {}
  ngOnInit(): void {
    if (!this.cookieService.check('session')) {
      this.http.get(this.host + 'api/signup').subscribe(data => {
        this.cookieService.set('session', data['session']);

        this.http.get(this.host + 'api/account', {params: new HttpParams().set('session', data['session'])}).subscribe(data => {
          this.user = data as User;

          this.http.get(
            this.host + 'api/projects',
            {params: new HttpParams().set('session', this.cookieService.get('session'))}
            ).subscribe(data => {
              this.projects = data as Project[];
            });
        });
      });
    } else {
      this.http.get(
        this.host + 'api/account',
        {params: new HttpParams().set('session', this.cookieService.get('session'))}
        ).subscribe(data => {
        this.user = data as User;

        this.http.get(
          this.host + 'api/projects',
          {params: new HttpParams().set('session', this.cookieService.get('session'))
          }).subscribe(data => {
          this.projects = data['projects'] as Project[];
        });
      });
    }
  }
}
