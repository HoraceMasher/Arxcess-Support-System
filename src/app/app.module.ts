import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TicketsService } from './tickets.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketsFormComponent } from './tickets-form/tickets-form.component';
import { TicketsDetailsComponent } from './tickets-details/tickets-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryManagementComponent } from './tickets-list/Dashboard/category-management/category-management.component';
import { CategoryFormComponent } from './tickets-list/Dashboard/category-form/category-form.component';
import { NavComponent } from './nav/nav.component';
@NgModule({
  declarations: [
    AppComponent,
    TicketsListComponent,
    TicketsFormComponent,
    TicketsDetailsComponent,
    CategoryManagementComponent,
    CategoryFormComponent,
    NavComponent,
   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule
   
  ],
  providers: [ TicketsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
