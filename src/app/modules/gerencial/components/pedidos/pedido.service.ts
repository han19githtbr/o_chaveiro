import { Notification, UpdateNotification } from './../../../shared/models/notification';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrlPedido = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) { }


  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrlPedido}`);
  }

  getNotificationById(notificationId: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.apiUrlPedido}/${notificationId}`);
  }

  updateNotification(id: number, notificationData: UpdateNotification): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrlPedido}/${id}`, notificationData);
  }

  updateNotificationStatus(notificationId: number, newStatus: string): Observable<Notification> {
    const url = `http://localhost:3000/notifications/${notificationId}/update-status`;
    const body = { status: newStatus }; // Enviar o novo status no corpo da requisição
    return this.http.patch<Notification>(url, body);
  }

}
