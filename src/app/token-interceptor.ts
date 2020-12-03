import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service';

export class TokenInterceptor implements HttpInterceptor {
  authService = new AuthService();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modified = req.clone({
      setHeaders: { Authorization: 'Bearer ' + this.authService.getAccessToken() }
    });
    return next.handle(modified);
  }
}
