import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsFormComponent } from './tickets-form/tickets-form.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketsDetailsComponent } from './tickets-details/tickets-details.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
const routes: Routes = [
  { path: '', component: TicketsListComponent },
  { path: 'tickets-form', component: TicketsFormComponent },
  {path: 'tickets-details', component:TicketsDetailsComponent},
  {path: 'admin-settings', component: AdminSettingsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
