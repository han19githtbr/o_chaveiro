import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  //private readonly uploadUrl = 'https://freelifeconect.app.br:8080/upload-file';
  private readonly uploadUrl = 'http://localhost:3000/upload-file';

  constructor(private http: HttpClient) { }


  public uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('images', file); // Altere "file" para "images"

    //return this.http.post(this.uploadUrl, formData);
    return this.http.post<{ url: string }>(this.uploadUrl, formData);
  }

}
