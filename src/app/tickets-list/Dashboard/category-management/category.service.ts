import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/constants/environments';
import { Category } from './Category.model'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  createCategory(category: Category): Observable<Category> {
    const url = `${this.baseUrl}/support/category`;
    return this.http.post<Category>(url, category);
  }

  getCategories(): Observable<Category[]> {
    const url = `${this.baseUrl}/support/category`;
    return this.http.get<Category[]>(url);
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.baseUrl}/support/category/${id}`;
    return this.http.get<Category>(url);
  }

  getCategorySubcategories(id: number): Observable<Category[]> {
    const url = `${this.baseUrl}/support/category/subcategory/${id}`;
    return this.http.get<Category[]>(url);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    const url = `${this.baseUrl}/support/category/${id}`;
    return this.http.put<Category>(url, category);
  }

  deleteCategory(id: number): Observable<void> {
    const url = `${this.baseUrl}/support/category/${id}`;
    return this.http.delete<void>(url);
  }
}
