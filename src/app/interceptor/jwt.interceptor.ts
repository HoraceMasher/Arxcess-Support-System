import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Determine if the user is an agent or a regular user
    const isUserAgent = this.authService.isUserAgent();

    // Get the appropriate JWT token based on the user's role
    const authToken = isUserAgent ? this.authService.getAuthToken() : this.authService.getAuthUserToken();

    // Clone the request and add the Authorization header with the JWT token
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    // Pass the modified request to the next interceptor or to the HTTP handler
    return next.handle(request);
  }
}
