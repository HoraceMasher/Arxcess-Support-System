import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './constants/environments';
import { Observable } from 'rxjs';
import { Ticket } from './Tickets.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    const url = `${this.baseUrl}/support/category`;
    return this.http.get(url);
  }

  getSubcategories(categoryId: string): Observable<any> {
    const url = `${this.baseUrl}/support/category/subcategory/${categoryId}`;
    return this.http.get(url);
  }
  

  getTertiarySubcategories(subcategoryId: string): Observable<any> {
    const url = `${this.baseUrl}/support/category/subcategory/${subcategoryId}`;
    return this.http.get(url);
  }

  submitTicket(ticketData: any): Observable<any> {
    const url = `${this.baseUrl}/support/ticket/me`;
    return this.http.post(url, ticketData);
  }

  getTicket(ticketId: string): Observable<Ticket> {
    const url = `${this.baseUrl}/support/ticket/me/${ticketId}`;
    return this.http.get<Ticket>(url);
  }

  toggleTicketStatus(ticketId: string): Observable<any> {
    const url = `${this.baseUrl}/support/ticket/me/${ticketId}/toggle-status`;
    return this.http.patch(url, null);
  }

  addMessage(ticketId: string, message: string): Observable<any> {
    const url = `${this.baseUrl}/support/ticket/me/${ticketId}/messages`;
    return this.http.post(url, { message });
  }

  attachFile(ticketId: string, file: File): Observable<any> {
    const url = `${this.baseUrl}/support/ticket/me/file/${ticketId}`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.put(url, formData);
  }

  updateTicket(ticketId: string, ticketData: any): Observable<any> {
    const url = `${this.baseUrl}/support/ticket/me/${ticketId}`;
    return this.http.put(url, ticketData);
  }
}
