import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chaveiro } from 'src/app/modules/shared/models/chaveiro';
import { Service } from 'src/app/modules/shared/models/service';
import { Cliente } from 'src/app/modules/shared/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrlCliente = 'http://localhost:3000/clientes';
  private apiUrlChaveiro = 'http://localhost:3000/chaveiro';
  private apiUrlServico = 'http://localhost:3000/servico';

  constructor(private http: HttpClient) { }

  getTotalClientes(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrlCliente}/count`);
  }

  getRandomCliente(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlCliente}/random`);
  }

  getClientesPaginados(page: number, size: number): Observable<{ clientes: any[] }> {
    return this.http.get<{ clientes: any[] }>(`${this.apiUrlCliente}?page=${page}&size=${size}`);
  }

  getTotalChaveiros(): Observable<Chaveiro[]> {
    return this.http.get<Chaveiro[]>(`${this.apiUrlChaveiro}`);
  }

  getTotalServicos(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrlServico}`);
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrlServico}`);
  }

  updateClientStatus(clientId: number, newStatus: string): Observable<Cliente> {
    const url = `http://locahost:3080/clientes/${clientId}/update-status`;
    const body = { status: newStatus }; // Enviar o novo status no corpo da requisição
    return this.http.patch<Cliente>(url, body);
  }


  getClientById(clientId: number): Observable<any>{
    return this.http.get(`${this.apiUrlCliente}/${clientId}`);
  }

}
