import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ClienteFormComponent } from '../../gerencial/components/cliente-form/cliente-form.component';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { tap } from 'rxjs/operators';
import { CustomNotificationComponent } from '../../gerencial/components/custom-notification/custom-notification.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  //private apiUrl = 'http://localhost:3000/notifications';
  private apiUrl = `${environment.api}/notifications`;
  private socketUrl = environment.api;
  private socket: Socket;
  private notificationsSubject = new Subject<string | { message: string; data?: any }>();
  //notifications$ = this.notificationsSubject.asObservable();


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.socket = io(this.socketUrl, {
      withCredentials: true,
    });

    this.socket.on('notification', (notification: { message: string; data?: any }) => {
      this.notificationsSubject.next(notification);
      this.showNotification(notification.message, 'Ver detalhes', notification.data);
    });
  }

  sendNotification(message: string): Observable<any> {
    return this.http.post(this.apiUrl, { message });
  }

  getNotifications(): Observable<string | { message: string; data?: any; }> {
    return this.notificationsSubject.asObservable();
  }

  showNotification(message: string, action: string, data: any) {
    const snackBarRef = this.snackBar.openFromComponent(CustomNotificationComponent, {
      data: { message, cliente: data },
      duration: undefined,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['custom-snackbar-dashboard']
    });

    snackBarRef.onAction().subscribe(() => {
      this.openOrderDetailsModal(data);
    });

    this.notificationsSubject.next({ message, data });
  }

  showNewNotification(message: string, action: string, data: any) {
    const snackBarRef = this.snackBar.openFromComponent(CustomNotificationComponent, {
      data: { message, cliente: data },
      duration: undefined,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: ['custom-snackbar-dashboard']
    });

    snackBarRef.onAction().subscribe(() => {
      this.openOrderDetailsModal(data);
    });

    this.notificationsSubject.next({ message, data });
  }

  updateNotificationStatus(notificationId: number, newStatus: string): Observable<Notification> {
    const url = `http://localhost:3000/notifications/${notificationId}/update-status`;
    const body = { status: newStatus }; // Enviar o novo status no corpo da requisição
    return this.http.patch<Notification>(url, body);
  }

  createNotification(notification: any): Observable<any> {
    console.log('Enviando notificação:', notification); // Adicione este log
    return this.http.post<any>(this.apiUrl, notification).pipe(
      tap(response => {
        console.log('Resposta da API ao criar notificação:', response);
      })
    );
  }

  fetchNotifications(): void {
    this.http.get<{ message: string; data?: any }[]>(`${this.apiUrl}`).subscribe(notifications => {
      notifications.forEach(notification => this.sendNotification(notification.message));
    });
  }

  /*fetchNotificationById(id: string): void {
    this.http.get<{ message: string; data?: any }>(`${this.apiUrl}/${id}`).subscribe(notification => {

      this.sendNotification(notification.message);
    });
  }*/

  fetchNotificationById(id: number): Observable<{ message: string; data?: any }> {
    return this.http.get<{ message: string; data?: any }>(`${this.apiUrl}/${id}`);
  }

  openOrderDetailsModal(data: any): void {
    this.dialog.open(ClienteFormComponent, {
      width: '400px',
      data: data
    });
  }
}
