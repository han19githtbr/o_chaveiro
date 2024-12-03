import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Service,
  CreateService,
  UpdateService,
} from 'src/app/modules/shared/models/service';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  //private apiUrlServico = 'http://localhost:3000/servico';
  private apiUrlServico = 'https://ochaveiro.netlify.app/servico';

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrlServico}`);
  }

  getServiceById(serviceId: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrlServico}/${serviceId}`);
  }

  deleteServiceById(servicoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlServico}/${servicoId}`);
  }

  createService(serviceData: any): Observable<Service> {
    return this.http.post<Service>(`${this.apiUrlServico}`, serviceData);
  }

  updateService(id: number, serviceData: UpdateService): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrlServico}/${id}`, serviceData);
  }

  updateServiceStatus(
    serviceId: number,
    newStatus: string
  ): Observable<Service> {
    const url = `http://localhost:3000/servico/${serviceId}/update-status`;
    //const url = `https://api-ochaveiro.vercel.app/servico/${serviceId}/update-status`;
    const body = { status: newStatus }; // Enviar o novo status no corpo da requisição
    return this.http.patch<Service>(url, body);
  }
}
