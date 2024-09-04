import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../../core/auth/storage.service';
import { SigninCredentials } from '../../shared/models/signin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) { }

  public login(credentials: any): Observable<any> {
    return this.http.post(`${environment.api}/auth/login/adm`, credentials);
  }

  public forgotPassword(credentials: { credential: string }): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/forgot-password/adm`, credentials);
  }

  public resetPassword(credentials: { credential: string; code: string; password: string; confirmPassword: string }): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/reset-password/adm`, credentials);
  }

}
