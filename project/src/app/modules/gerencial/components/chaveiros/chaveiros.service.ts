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

  deleteChaveiroById(chaveiroId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlChaveiro}/${chaveiroId}`);
  }

  createChaveiro(chaveiroData: any): Observable<Chaveiro> {
    return this.http.post<Chaveiro>(`${this.apiUrlChaveiro}`, chaveiroData);
  }

  updateChaveiro(id: number, chaveiroData: UpdateChaveiro): Observable<Chaveiro> {
    return this.http.put<Chaveiro>(`${this.apiUrlChaveiro}/${id}`, chaveiroData);
  }

  updateChaveiroStatus(chaveiroId: number, newStatus: string): Observable<Chaveiro> {
    const url = `http://localhost:3000/chaveiro/${chaveiroId}/update-status`;
    const body = { status: newStatus }; // Enviar o novo status no corpo da requisição
    return this.http.patch<Chaveiro>(url, body);
  }

}
