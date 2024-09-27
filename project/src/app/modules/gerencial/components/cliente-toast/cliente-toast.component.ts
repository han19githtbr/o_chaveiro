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
    <div class="cliente-toast" (click)="openModal()"> <!-- Adicionado evento de clique -->
      <!-- Adicionando o aviso de status -->
      <!--'pendente': cliente.status === 'pendente',-->
      <div class="status-badge" [ngClass]="{
        'ativo': cliente.status === 'ativo',
        'pendente': cliente.status === 'pendente',
        'inativo': cliente.status === 'inativo',
      }">
        <mat-icon class="error" *ngIf="cliente.status === 'pendente'">error</mat-icon>
        <mat-icon *ngIf="cliente.status === 'ativo'">check_circle</mat-icon>
        <mat-icon *ngIf="cliente.status === 'inativo'">cancel</mat-icon>

        {{ getStatusLabel(cliente.status) | titlecase }}
      </div>


      <img [src]="cliente.imageUrl" alt="Cliente Image" class="cliente-image" />
      <div class="container-cliente">
        <span class="cliente-name">{{ cliente.name }}</span>
        <span class="cliente-phone">{{ cliente.phone }}</span>
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
      .container-cliente {
        display: flex;
        flex-direction: column;
      }

      .cliente-toast {
        display: flex;
        align-items: center;
        padding: 10px;
        background: #0c02c1;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.8);
        position: fixed;
        //border: 1px solid yellow;
        bottom: 20px;
        width: 240px;
        right: 20px;
        margin-right: 300px;
        z-index: 1000;
        border-radius: 5px;
        cursor: pointer;
      }

      .cliente-image {
        width: 50px;
        height: 50px;
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

      .status-badge.pendente {
        border: 2px solid black;
        background-color: #eedf22;
        color: black;
      }

      .status-badge.ativo {
        border: 2px solid black;
        background-color: #0fce22;
        color: black;
      }

      .status-badge.inativo {
        border: 2px solid black;
        background-color: #ea1e0d;
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

  getStatusLabel(status: string): string {
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
  }


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
