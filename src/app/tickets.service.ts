import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './constants/environments';

import { Observable } from 'rxjs';
import { Ticket } from './Tickets.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private baseUrl: string= environment.baseUrl; 

  constructor(private http: HttpClient) { }

  getCategories() {
    const url = `${this.baseUrl}/support/category`;
    return this.http.get(url);
  }

  getSubcategories(categoryId: string) {
    const url = `${this.baseUrl}/support/category/${categoryId}`;
    return this.http.get(url);
  }
  
  getTertiarySubcategories(subcategoryId: string) {
    const url = `${this.baseUrl}/support/category/subcategory/${subcategoryId}`;
    return this.http.get(url);
  }
  

  submitTicket(ticketData: any) {
    const url = `${this.baseUrl}/support/category`;
    return this.http.post(url, ticketData);
  }


  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<Ticket>(`/api/tickets/${ticketId}`);
  }

  toggleTicketStatus(ticketId: string): Observable<any> {
    return this.http.patch(`/api/tickets/${ticketId}/toggle-status`, null);
  }

  addMessage(ticketId: string, message: string): Observable<any> {
    return this.http.post(`/api/tickets/${ticketId}/messages`, { message });
  }
}
