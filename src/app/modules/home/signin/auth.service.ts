import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../../core/auth/storage.service';
import { SigninCredentials } from '../../shared/models/signin';
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

  /*public login(credentials: any): Observable<any> {
    return this.http.post(`${environment.api}/auth/login/adm`, credentials);
  }*/

  public login(credentials: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<LoginResponse>(`${environment.api}/auth/login/adm`, credentials, { headers }).pipe(
      tap(response => {
        this.storageService.saveToken(response.token);
        console.log(response);
        this.fetchAdminData(response.account.id);
      })
    )
  }

  public forgotPassword(credentials: { credential: string }): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/forgot-password/adm`, credentials);
  }

  public fetchAdminData(adminId: number): Observable<UserAdmin> {
    return this.http.get<UserAdmin>(`${environment.api}/admins/${adminId}`);
  }

  public fetchUserData(userId: number): Observable<UpdateRegisterDto> {
    return this.http.get<UpdateRegisterDto>(`${environment.api}/registers/${userId}`)
  }

  public resetPassword(credentials: { credential: string; code: string; password: string; confirmPassword: string }): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/reset-password/adm`, credentials);
  }

}
