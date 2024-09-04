import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chaveiro } from 'src/app/modules/shared/models/chaveiro';

@Injectable({
  providedIn: 'root'
})
export class ChaveiroService {

  private apiUrlChaveiro = 'http://localhost:3000/chaveiro';

  constructor(private http: HttpClient) { }


  getAllChaveiros(): Observable<Chaveiro[]> {
    return this.http.get<Chaveiro[]>(`${this.apiUrlChaveiro}`);
  }

  getChaveiroById(id: number): Observable<Chaveiro> {
    return this.http.get<Chaveiro>(`${this.apiUrlChaveiro}/${id}`);
  }

}
