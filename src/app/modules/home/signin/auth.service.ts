import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../../core/auth/storage.service';
import { UpdateRegisterDto } from '../../shared/models/register.dto';
import { UserAdmin } from '../../shared/models/userAdmin';

interface LoginResponse {
  token: string;
  account: {
    id: number;
    role: string;
  }
  userId: number;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) { }


  public login(credentials: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<LoginResponse>(`${environment.api}/auth/login`, credentials, { headers }).pipe(
      tap(response => {
        this.storageService.saveToken(response.token);
        console.log(response);
        this.fetchUserData(response.account.id);
      })
    );
  }


  /*public loginAsAdmin(credentials: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<LoginResponse>(`${environment.api}/auth/login/adm`, credentials, { headers })
  }*/

  public loginAsAdmin(credentials: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<LoginResponse>(`${environment.api}/auth/login/adm`, credentials, { headers }).pipe(
      tap(response => {
        this.storageService.saveToken(response.token);
        console.log(response);
        this.fetchAdminData(response.account.id);
      })
    );
  }

  public fetchAdminData(adminId: number): Observable<UserAdmin> {
    return this.http.get<UserAdmin>(`${environment.api}/admins/${adminId}`);
  }

  public fetchUserData(companyId: number): Observable<UpdateRegisterDto> {
    return this.http.get<UpdateRegisterDto>(`${environment.api}/admins/${companyId}`)
  }

  public forgotPassword(credentials: { credential: string }): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/forgot-password`, credentials);
  }

  public resetPassword(credentials: { credential: string; code: string; password: string; confirmPassword: string }): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/reset-password`, credentials);
  }
}
