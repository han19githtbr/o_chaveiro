import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAdmin, UpdateAdmin } from 'src/app/modules/shared/models/userAdmin';
import { UserAdminResponse } from 'src/app/modules/shared/models/userAdmin';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private baseUrl = 'http://localhost:3000';
  //private baseUrl = 'https://api-ochaveiro.vercel.app';

  constructor(private http: HttpClient) {}


  findAllUsers(): Observable<UserAdmin[]> {
    return this.http.get<UserAdmin[]>(`${this.baseUrl}/admins`);
  }

  findById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/admins/${userId}`);
  }

  deleteUserById(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admins/${userId}`);
  }

  create(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admins`, body);
  }

  /*update(body: any, userId: number){
    return this.http.put(`${this.baseUrl}/admins/${userId}`, body);
  }*/

  update(userId: number, adminData: UpdateAdmin){
    return this.http.put<UserAdmin>(`${this.baseUrl}/admins/${userId}`, adminData);
  }

  /*updateChaveiro(id: number, chaveiroData: UpdateChaveiro): Observable<Chaveiro> {
    return this.http.put<Chaveiro>(`${this.apiUrlChaveiro}/${id}`, chaveiroData);
  }*/

  updateStatus(userId: number, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/admins/${userId}/update-status`, { status });
  }

  getAllPermissions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admins/permissions`)
  }
}
