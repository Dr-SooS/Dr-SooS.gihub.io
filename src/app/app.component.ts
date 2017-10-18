import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ng2-cookies';
import {User} from './user';
import {Project} from './project';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserService} from './user.service';
import {ProjectsService} from './projects.service';
import {Task} from './task';
import {TasksService} from './tasks.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    host = 'http://cheephs.pythonanywhere.com/';
    user: User;
    projects: Project[];
    tasks: Task[];
    newProjectTitle: string;

    constructor(
        public cookieService: CookieService,
        private http: HttpClient,
        public userService: UserService,
        public projectsService: ProjectsService,
        public tasksService: TasksService
    ) {}

    ngOnInit(): void {
        this.userService.getUser().subscribe(data => {
            this.user = data;
            this.projectsService.getProjects().subscribe(data => {
                this.projects = data['projects'];
            });
        });
    }
    getTasks(project_id: number): void {
        this.tasksService.getTasks(project_id).subscribe(data => {
           this.tasks = data['tasks'];
        });
    }
}
