// cliente-toast.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { Subscription } from 'rxjs';
import { ClienteModalNotificationComponent } from '../cliente-modal-notification/cliente-modal-notification.component';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  template: `
    <div
      class="notification-toast"
      [ngClass]="{ 'notification-toast-exit': isExiting }"
      (click)="openModal()"
    >
      <!-- Adicionado evento de clique -->
      <!-- Adicionando o aviso de status -->
      <img
        [src]="notification.imageUrl"
        alt="Cliente Image"
        class="cliente-image"
      />
      <div
        class="status-badge"
        [ngClass]="{
          novo: notification.status === 'novo',
          pendente: notification.status === 'pendente',
          servido: notification.status === 'servido',
          andando: notification.status === 'andando',
          cancelado: notification.status === 'cancelado'
        }"
      >
        <mat-icon class="fiber_new" *ngIf="notification.status === 'novo'"
          >fiber_new</mat-icon
        >
        <mat-icon class="error" *ngIf="notification.status === 'pendente'"
          >error</mat-icon
        >
        <mat-icon class="check_circle" *ngIf="notification.status === 'servido'"
          >check_circle</mat-icon
        >
        <mat-icon class="loading-icon" *ngIf="notification.status === 'andando'"
          >loop</mat-icon
        >
        <mat-icon class="cancel" *ngIf="notification.status === 'cancelado'"
          >cancel</mat-icon
        >

        {{ notification.status }}
      </div>

      <div class="container-cliente">
        <span class="cliente-name">Nome: {{ notification.name }}</span>
        <span class="cliente-phone">Telefone: {{ notification.phone }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes slideIn {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes slideOut {
        from {
          transform: translateY(0);
          opacity: 1;
        }
        to {
          transform: translateY(100%);
          opacity: 0;
        }
      }

      .notification-toast-exit {
        animation: slideOut 0.5s forwards;
      }

      .container-cliente {
        display: flex;
        flex-direction: column;
      }
      .notification-toast {
        animation: slideIn 1s forwards;
        display: flex;
        align-items: center;
        padding: 10px;
        background: #000000;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.8);
        position: fixed;
        bottom: 20px;
        width: 290px;
        right: 20px;
        z-index: 1000;
        border-radius: 5px;
        cursor: pointer;
      }
      .notification-toast:hover {
        cursor: pointer;
      }

      .loading-icon {
        animation: rotation 1.5s infinite linear;
        color: #ffff00;
      }

      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .cliente-image {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .cliente-name {
        font-weight: bold;
        font-size: 20px;
        font-family: 'Times New Roman', Times, serif;
        color: white;
      }

      .cliente-phone {
        text-wrap: wrap;
        color: white;
        font-size: 20px;
        font-family: 'Times New Roman', Times, serif;
        font-weight: bold;
      }

      .status-badge {
        display: flex;
        align-items: center;
        padding: 2px 6px;
        margin-left: -10px;
        border-radius: 4px;
        margin-bottom: 105px;
        position: absolute;
        font-weight: bold;
        color: white;
        gap: 5px;
        width: fit-content;
      }

      .fiber_new {
        margin: 0 auto;
        animation: infiniteZoom 0.5s infinite;
      }

      @keyframes infiniteZoom {
        70% {
          transform: scale(1);
        }
        70% {
          transform: scale(1.17);
        }
      }

      .error {
        animation: infiniteZoom 0.5s infinite;
      }

      .status-badge.novo {
        background-color: #edb116;
        border: 2px solid black;
        color: black;
      }

      .status-badge.pendente {
        background-color: #eedf22;
        border: 2px solid black;
        color: black;
      }

      .status-badge.servido {
        background-color: #0fce22;
        border: 2px solid black;
        color: black;
      }

      .status-badge.cancelado {
        background-color: #ea1e0d;
        border: 2px solid black;
        color: black;
      }

      .status-badge.andando {
        background-color: #005b88;
        border: 2px solid black;
        color: black;
      }
    `,
  ],
  imports: [CommonModule, MatIconModule, ClienteModalNotificationComponent],
})
export default class NotificationToastComponent implements OnInit, OnDestroy {
  @Input() notification: any;

  isModalOpen: boolean = false;
  isExiting: boolean = false;

  @Output() remove = new EventEmitter<void>();

  private notificationSubscription: Subscription | undefined;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.notificationSubscription = this.notificationService
      .getNotifications()
      .subscribe((notification: string | { message: string; data?: any }) => {
        if (typeof notification !== 'string' && notification.data) {
          this.notification.status = notification.data.status;
        }
        this.dismiss();
      });

    setTimeout(() => {
      this.dismiss();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  /*getStatusLabel(status: string): string {
    switch (status) {
      case 'ativo':
        return 'servido';
      case 'inativo':
        return 'cancelado';
      case 'pendente':
        return 'pendente';
      default:
        return status;
    }
  }*/

  dismiss() {
    this.remove.emit();
  }

  openModal() {
    this.dialog.open(ClienteModalNotificationComponent, {
      width: '400px',
      data: this.notification,
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
