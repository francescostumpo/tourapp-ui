import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service';
import {serviceCounts} from './globals';
import {finalize} from 'rxjs/operators';

export class TokenInterceptor implements HttpInterceptor {
  serviceCounts = serviceCounts;
  authService = new AuthService();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.serviceCounts ++;
    const modified = req.clone({
      setHeaders: { Authorization: 'Bearer ' + this.authService.getAccessToken() }
    });
    document.getElementById('loading').style.display = 'block';
    return next.handle(modified).pipe(
      finalize(() => {
        this.serviceCounts--;


        if (this.serviceCounts === 0) {
          document.getElementById('loading').style.display = 'none';
        }
      }));
  }
}
