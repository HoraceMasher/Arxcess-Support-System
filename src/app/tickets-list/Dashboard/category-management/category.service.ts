import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/constants/environments';
import { Category } from './Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  createCategory(category: Category, jwtToken: string): Observable<Category> {
    const url = `${this.baseUrl}/support/category`;
    const headers = { 'Authorization': `Bearer ${jwtToken}` };
    return this.http.post<Category>(url, category, { headers });
  }

  getCategories(jwtToken: string): Observable<Category[]> {
    const url = `${this.baseUrl}/support/category`;
    const headers = { 'Authorization': `Bearer ${jwtToken}` };
    return this.http.get<Category[]>(url, { headers });
  }

  getCategory(id: number, jwtToken: string): Observable<Category> {
    const url = `${this.baseUrl}/support/category/${id}`;
    const headers = { 'Authorization': `Bearer ${jwtToken}` };
    return this.http.get<Category>(url, { headers });
  }

  getCategorySubcategories(id: number, jwtToken: string): Observable<Category[]> {
    const url = `${this.baseUrl}/support/category/subcategory/${id}`;
    const headers = { 'Authorization': `Bearer ${jwtToken}` };
    return this.http.get<Category[]>(url, { headers });
  }

  updateCategory(id: number, category: Category, jwtToken: string): Observable<Category> {
    const url = `${this.baseUrl}/support/category/${id}`;
    const headers = { 'Authorization': `Bearer ${jwtToken}` };
    return this.http.put<Category>(url, category, { headers });
  }

  deleteCategory(id: number, jwtToken: string): Observable<void> {
    const url = `${this.baseUrl}/support/category/${id}`;
    const headers = { 'Authorization': `Bearer ${jwtToken}` };
    return this.http.delete<void>(url, { headers });
  }
}
