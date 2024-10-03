import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, CreateCliente, UpdateCliente } from 'src/app/modules/shared/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrlCliente = 'http://localhost:3000/clientes';
  //private apiUrlCliente = 'https://api-ochaveiro.vercel.app/clientes'

  constructor(private http: HttpClient) { }


  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrlCliente}`);
  }

  getClientById(clientId: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrlCliente}/${clientId}`);
  }

  deleteClienteById(clientId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlCliente}/${clientId}`);
  }

  createClient(clientData: any): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrlCliente}`, clientData);
  }

  updateClient(id: number, clientData: UpdateCliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrlCliente}/${id}`, clientData);
  }

  updateClientStatus(clientId: number, newStatus: string): Observable<Cliente> {
    const url = `http://localhost:3000/clientes/${clientId}/update-status`;
    //const url = `https://api-ochaveiro.vercel.app/clientes/${clientId}/update-status`
    const body = { status: newStatus }; // Enviar o novo status no corpo da requisição
    return this.http.patch<Cliente>(url, body);
  }

}
