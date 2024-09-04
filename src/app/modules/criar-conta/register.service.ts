import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { RegisterDto, CreateRegisterDto, UpdateRegisterDto } from "../shared/models/register.dto";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  //private apiUrl = 'https://freelifeconect.app.br:8080/registers';

  private apiUrl = 'http://localhost:3000/registers';

  constructor(private http: HttpClient) {}


  public login(credentials: any): Observable<any> {
    return this.http.post(`${environment.api}/auth/login/adm`, credentials);
  }

  createRegister(data: CreateRegisterDto): Observable<{ token: string, account: RegisterDto }> {
    return this.http.post<{ token: string, account: RegisterDto }>(this.apiUrl, data);
  }

  updateRegister(id: number, data: RegisterDto): Observable<RegisterDto> {
    return this.http.put<RegisterDto>(`${this.apiUrl}/${id}`, data);
  }

  deleteRegister(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
