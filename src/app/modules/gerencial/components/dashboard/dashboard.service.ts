import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  //private api = 'https://freelifeconect.app.br:8080';

  constructor(private http: HttpClient) { }

  /*public getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.api}/registers/ixcsoft/clientes`);
  }*/


}
