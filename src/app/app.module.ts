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


@NgModule({
  declarations: [
    AppComponent,
    TicketsListComponent,
    TicketsFormComponent,
    TicketsDetailsComponent

    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
   
  ],
  providers: [ TicketsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
