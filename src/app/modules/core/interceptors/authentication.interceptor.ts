import { Injectable } from '@angular/core';
import { StorageService } from '../auth/storage.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    const token = this.storageService.getToken()
    if (token) {
      request = request.clone({
        setHeaders:{
          'Authorization': `Bearer ${token}`
        }
      })
    }

    return next.handle(request);
  }
}
