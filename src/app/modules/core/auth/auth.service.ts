import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
//import { SigninCredentials, UserSignin } from '@shared/models/signin.model';
export type AuthUser = 'admin' | 'company';
import { Observable, tap } from 'rxjs';
import { User } from '../../shared/models/signin';
//import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /*getAuthenticatedUser(): User | null {
    const user = localStorage.getItem('authenticatedUser');
    return user ? JSON.parse(user): null;
  }*/


  /*constructor(private http: HttpClient, private userService: UserService) {}

  auth({ email, password }: SigninCredentials): Observable<UserSignin> {
    return this.http
      .post<UserSignin>(`${environment.api}/sessions/standard`, {
        email,
        password,
      })
      .pipe(tap((user) => this.userService.saveToken(user)));
  }*/
}
