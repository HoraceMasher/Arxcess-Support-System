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

  getCategories(userJwtToken: string): Observable<any> {
    const url = `${this.baseUrl}/support/category`;
    const headers = { 'Authorization': `Bearer ${userJwtToken}` };
    return this.http.get(url, { headers });
  }

  getSubcategories(categoryId: string, userJwtToken: string): Observable<any> {
    const url = `${this.baseUrl}/support/category/subcategory/${categoryId}`;
    const headers = { 'Authorization': `Bearer ${userJwtToken}` };
    return this.http.get(url, { headers });
  }
  
  getTertiarySubcategories(subcategoryId: string, userJwtToken: string): Observable<any> {
    const url = `${this.baseUrl}/support/category/subcategory/${subcategoryId}`;
    const headers = { 'Authorization': `Bearer ${userJwtToken}` };
    return this.http.get(url, { headers });
  }

  submitTicket(ticketData: any, userJwtToken: string): Observable<any> {
    const url = `${this.baseUrl}/support/ticket/me`;
    const headers = { 'Authorization': `Bearer ${userJwtToken}` };
    return this.http.post(url, ticketData, { headers });
  }

  getTicket(ticketId: string, userJwtToken: string): Observable<Ticket> {
    const url = `${this.baseUrl}/support/ticket/me/${ticketId}`;
    const headers = { 'Authorization': `Bearer ${userJwtToken}` };
    return this.http.get<Ticket>(url, { headers });
  }

  toggleTicketStatus(ticketId: string, userJwtToken: string): Observable<any> {
    const url = `${this.baseUrl}/support/ticket/me/${ticketId}/toggle-status`;
    const headers = { 'Authorization': `Bearer ${userJwtToken}` };
    return this.http.patch(url, null, { headers });
  }

  addMessage(ticketId: string, message: string, userJwtToken: string): Observable<any> {
    const url = `${this.baseUrl}/support/ticket/me/${ticketId}/messages`;
    const headers = { 'Authorization': `Bearer ${userJwtToken}` };
    return this.http.post(url, { message }, { headers });
  }

  attachFile(ticketId: string, file: File, userJwtToken: string): Observable<any> {
    const url = `${this.baseUrl}/support/ticket/me/file/${ticketId}`;
    const headers = { 'Authorization': `Bearer ${userJwtToken}` };
    const formData = new FormData();
    formData.append('file', file);
    return this.http.put(url, formData, { headers });
  }

  updateTicket(ticketId: string, ticketData: any, userJwtToken: string): Observable<any> {
    const url = `${this.baseUrl}/support/ticket/me/${ticketId}`;
    const headers = { 'Authorization': `Bearer ${userJwtToken}` };
    return this.http.put(url, ticketData, { headers });
  }
}
