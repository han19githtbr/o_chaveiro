import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chaveiro, CreateChaveiro, UpdateChaveiro } from 'src/app/modules/shared/models/chaveiro';

@Injectable({
  providedIn: 'root'
})
export class ChaveiroService {

  private apiUrlChaveiro = 'http://localhost:3000/chaveiro';

  constructor(private http: HttpClient) { }


  getAllChaveiros(): Observable<Chaveiro[]> {
    return this.http.get<Chaveiro[]>(`${this.apiUrlChaveiro}`);
  }

  getChaveiroById(chaveiroId: number): Observable<Chaveiro> {
    return this.http.get<Chaveiro>(`${this.apiUrlChaveiro}/${chaveiroId}`);
  }

  /*createChaveiro(data: CreateChaveiro): Observable<{chaveiro: Chaveiro}> {
    return this.http.post<{ chaveiro: Chaveiro }>(`${this.apiUrlChaveiro}`, data);
    console.log('chaveiro criado', data);
  }*/

  createChaveiro(chaveiroData: any): Observable<Chaveiro> {
    return this.http.post<Chaveiro>(`${this.apiUrlChaveiro}`, chaveiroData);
  }

  updateChaveiro(id: number, chaveiroData: UpdateChaveiro): Observable<Chaveiro> {
    return this.http.put<Chaveiro>(`${this.apiUrlChaveiro}/${id}`, chaveiroData);
  }

  /*createChaveiro(chaveiro: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlChaveiro}`, chaveiro);
  }*/

}
