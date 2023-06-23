import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../constants/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private isAuthenticated: boolean = false;
  private authToken: string = '';
  private authUserToken: string = '';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    const url = `${this.baseUrl}/support/auth/agent-login`;
    return this.http.post<any>(url, credentials)
      .pipe(
        tap((response: { token: any; }) => {
          // Assuming the response contains the agent JWT token
          const agentAuthToken = response.token;

          // Set the agent JWT token
          this.setAuthToken(agentAuthToken);
        })
      );
  }

  userLogin(credentials: { appType: string, business: string, email: string, password: string }): Observable<any> {
    const url = `${this.baseUrl}/support/auth/user-login`;
    return this.http.post<any>(url, credentials)
      .pipe(
        tap((response: { token: any; }) => {
          // Assuming the response contains the user JWT token
          const userAuthToken = response.token;

          // Set the user JWT token
          this.setAuthUserToken(userAuthToken);
        })
      );
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authtoken', token);
  }

  getAuthToken(): string {
    return this.authToken;
  }

  setAuthUserToken(token: string): void {
    this.authUserToken = token;
    localStorage.setItem('authUsertoken', token);
  }

  getAuthUserToken(): string {
    return this.authUserToken;
  }

  isUserAgent(): boolean {
    // Implement your logic to determine if the user is an agent or a regular user
    // For example, you can check if the agent JWT token exists
  
    const agentAuthToken = this.getAuthToken();
    const userAuthToken = this.getAuthUserToken();
  
    // Check if the agent JWT token exists and the user JWT token does not exist
    if (agentAuthToken && !userAuthToken) {
      return true; // User is an agent
    }
  
    return false; // User is a regular user
  }
  
}
