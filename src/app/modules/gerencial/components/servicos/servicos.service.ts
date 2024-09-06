import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service, CreateService } from 'src/app/modules/shared/models/service';


@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private apiUrlServico = 'http://localhost:3000/servico';

  constructor(private http: HttpClient) { }


  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrlServico}`);
  }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrlServico}/${id}`);
  }

  createService(data: CreateService): Observable<{service: Service}> {
    return this.http.post<{ service: Service }>(`${this.apiUrlServico}`, data);
  }

}
