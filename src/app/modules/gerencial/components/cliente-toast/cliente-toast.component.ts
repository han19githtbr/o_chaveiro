// cliente-toast.component.ts
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { ClienteModalComponent } from '../cliente-modal/cliente-modal.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { Subscription } from 'rxjs';
import { ClienteModalNotificationComponent } from '../cliente-modal-notification/cliente-modal-notification.component';

@Component({
  selector: 'app-cliente-toast',
  standalone: true,
  template: `
    <div class="cliente-toast" [ngClass]="{ 'cliente-toast-exit': isExiting }" (click)="openModal()"> <!-- Adicionado evento de clique -->
      <!-- Adicionando o aviso de status -->
      <!--'pendente': cliente.status === 'pendente',-->
      <div class="status-badge" [ngClass]="{
        'servido': cliente.status === 'servido',
        'pendente': cliente.status === 'pendente',
        'andando': cliente.status === 'andando',
        'cancelado': cliente.status === 'cancelado',
      }">
        <mat-icon class="error" *ngIf="cliente.status === 'pendente'">error</mat-icon>
        <mat-icon *ngIf="cliente.status === 'servido'">check_circle</mat-icon>
        <mat-icon *ngIf="cliente.status === 'cancelado'">cancel</mat-icon>
        <mat-icon class="loading-icon" *ngIf="cliente.status === 'andando'">loop</mat-icon>

        {{ cliente.status }}
      </div>


      <img [src]="cliente.imageUrl" alt="Cliente Image" class="cliente-image" />
      <div class="container-cliente">
        <span class="cliente-name">Nome:  {{ cliente.name }}</span>
        <span class="cliente-phone">Telefone:  {{ cliente.phone }}</span>
      </div>
    </div>

    <!-- Adiciona o componente modal e controla sua visibilidade com isModalOpen -->
    <app-cliente-modal
      *ngIf="isModalOpen"
      [cliente]="cliente"
      (close)="closeModal()"
    ></app-cliente-modal>
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


      .container-cliente {
        display: flex;
        flex-direction: column;
      }

      .cliente-toast {
        animation: slideIn 1s forwards;
        display: flex;
        align-items: center;
        padding: 10px;
        background: #0c02c1;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.8);
        position: fixed;
        bottom: 20px;
        width: 270px;
        right: 80px;
        margin-right: 300px;
        z-index: 1000;
        border-radius: 5px;
        cursor: pointer;
      }

      .cliente-toast-exit {
        animation: slideOut 0.6s forwards;
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
        align-items: left;
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

      .status-badge.pendente {
        border: 2px solid black;
        background-color: #eedf22;
        color: black;
      }

      .status-badge.servido {
        border: 2px solid black;
        background-color: #0fce22;
        color: black;
      }

      .status-badge.cancelado {
        border: 2px solid black;
        background-color: #ea1e0d;
        color: black;
      }

      .status-badge.andando {
        border: 2px solid black;
        background-color: #006595;
        color: black;
      }

    `,
  ],
  imports: [
    ClienteModalComponent,
    CommonModule,
    MatIconModule,
    ClienteModalNotificationComponent
  ],
})
export default class ClienteToastComponent implements OnInit, OnDestroy {
  @Input() cliente: any;
  isModalOpen: boolean = false;
  isExiting: boolean = false;
  @Output() remove = new EventEmitter<void>();

  private notificationSubscription: Subscription | undefined;
  private dismissTimeout: any; // Variável para armazenar o timeout

  constructor(private notificationService: NotificationService) {}


  ngOnInit() {
    this.notificationSubscription = this.notificationService.getNotifications()
      .subscribe((notification: string | { message: string; data?: any }) => {
        if (typeof notification !== 'string' && notification.data) {
          this.cliente.status = notification.data.status;
        }
      });

    this.startDismissTimer();
  }

  ngOnDestroy() {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    this.clearDismissTimer();
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


  // Inicia o temporizador para ocultar a toast
  startDismissTimer() {
    this.dismissTimeout = setTimeout(() => {
      this.dismiss();
    }, 8000);
  }

  // Limpa o temporizador
  clearDismissTimer() {
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout);
      this.dismissTimeout = null;
    }
  }

  dismiss() {
    this.remove.emit();
  }

  openModal() {
    this.isModalOpen = true;
    this.clearDismissTimer(); // Cancela o temporizador quando o modal é aberto
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
