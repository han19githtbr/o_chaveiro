import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ClienteFormComponent } from '../../gerencial/components/cliente-form/cliente-form.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new Subject<{ message: string; data: any }>();
  notifications$ = this.notificationsSubject.asObservable();


  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  showNotification(message: string, action: string, data: any) {
    const snackBarRef = this.snackBar.open(message, action, {
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


  openOrderDetailsModal(data: any): void {
    this.dialog.open(ClienteFormComponent, {
      width: '400px',
      data: data
    });
  }
}
