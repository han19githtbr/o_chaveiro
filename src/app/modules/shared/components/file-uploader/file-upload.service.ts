import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private readonly uploadUrl = 'https://freelifeconect.app.br:8080/upload-file';

  constructor(private http: HttpClient) { }

  public uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.uploadUrl, formData);
  }
}
