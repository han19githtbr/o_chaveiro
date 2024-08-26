import { Injectable } from '@angular/core';
import { UpdateRegisterDto } from '../../shared/models/register.dto';
import { UserAdmin } from '../../shared/models/userAdmin';
//import { UserDetailsDto } from '../../shared/models/register.dto';


const KEY = 'authToken';
const USER_KEY = 'userDetails';
const ADMIN_KEY = 'adminDetails';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  getToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  removeToken(): void{
    localStorage.removeItem(KEY)
  }

  saveUserDetails(user: UpdateRegisterDto): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUserDetails(): UpdateRegisterDto | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) as UpdateRegisterDto : null;
  }

  getAdminDetails(): UserAdmin | null {
    const admin = localStorage.getItem(ADMIN_KEY);
    return admin ? JSON.parse(admin) as UserAdmin : null;
  }

  removeUserDetails(): void {
    localStorage.removeItem(USER_KEY);
  }

  clear(): void {
    localStorage.removeItem(KEY);
    localStorage.removeItem(USER_KEY);
  }

}
