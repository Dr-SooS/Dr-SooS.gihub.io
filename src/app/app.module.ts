import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {UserService} from './user.service';
import {HostService} from './host.service';
import {CookieService} from 'ng2-cookies';
import {ProjectsService} from './projects.service';
import {TasksService} from './tasks.service';

import {AppComponent} from './app.component';



@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatRadioModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [CookieService, UserService, HostService, ProjectsService, TasksService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
