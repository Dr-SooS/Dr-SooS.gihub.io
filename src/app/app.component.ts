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
    selectedProject: Project;
    tasks: Task[];
    selectedTsk: Task;
    newProjectTitle: string;
    newTaskTitle: string;
    newTaskDesc: string;
    editTask: boolean;

    constructor(
        public cookieService: CookieService,
        private http: HttpClient,
        public userService: UserService,
        public projectsService: ProjectsService,
        public tasksService: TasksService
    ) {
      this.editTask = false;
    }

    ngOnInit(): void {
        this.userService.getUser().subscribe(data => {
            this.user = data;
            this.projectsService.getProjects().subscribe(data => {
                this.projects = data['projects'] as Project[];
            });
        });
    }
    showProjectTasks(project: Project): void {
        this.selectedProject = project;
        this.tasksService.getTasks(project.id).subscribe(data => {
           this.tasks = data['tasks'] as Task[];
        });
    }
    showTaskDetails(sn: any, task_id: number): void {
      sn.toggle();
      this.tasksService.getTask(task_id).subscribe(data => {
        this.selectedTsk = data['Task'] as Task;
      });
    }
    addTask(): void {
      this.tasksService.createTask(this.newTaskTitle, this.newTaskDesc, this.selectedProject.id).subscribe(data => {
        this.tasksService.getTasks(this.selectedProject.id).subscribe(data => {
          this.tasks = data['tasks'] as Task[];
        });
      });
    }
}
