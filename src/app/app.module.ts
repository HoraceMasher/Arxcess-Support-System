import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient, HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketsFormComponent } from './tickets-form/tickets-form.component';
import { TicketsDetailsComponent } from './tickets-details/tickets-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryManagementComponent } from './tickets-list/Dashboard/category-management/category-management.component';
import { CategoryFormComponent } from './tickets-list/Dashboard/category-form/category-form.component';
import { NavComponent } from './nav/nav.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { LoginComponent } from './auth/login/login.component';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { AuthService } from './auth/auth.service';
import { JwtInterceptor } from './interceptor/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TicketsListComponent,
    TicketsFormComponent,
    TicketsDetailsComponent,
    CategoryManagementComponent,
    CategoryFormComponent,
    NavComponent,
    AdminSettingsComponent,
    LoginComponent,
    UserLoginComponent,
    
   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
   
  ],
  providers: [HttpClient, AuthService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
