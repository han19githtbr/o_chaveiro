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


  public login(credentials: any, role: 'User' | 'Admin'): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const loginUrl = role === 'Admin' ? `${environment.api}/auth/login/adm` : `${environment.api}/auth/login`;

    return this.http.post<LoginResponse>(loginUrl, credentials, { headers }).pipe(
      tap(response => {
        this.storageService.saveToken(response.token);
        console.log(response);

        if (role === 'Admin') {
          this.fetchAdminData(response.account.id).subscribe({
            error: (err) => {
              console.error('Erro ao buscar dados do admin:', err);
            }
          });
        } else {
          this.fetchUserData(response.userId).subscribe({
            error: (err) => {
              console.error('Erro ao buscar dados do usuário:', err);
            }
          });
        }
      })
    );

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
