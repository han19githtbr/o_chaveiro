// cliente-toast.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClienteModalComponent } from '../cliente-modal/cliente-modal.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cliente-toast',
  standalone: true,
  template: `
    <div class="cliente-toast" (click)="openModal()"> <!-- Adicionado evento de clique -->
      <!-- Adicionando o aviso de status -->
      <div class="status-badge" [ngClass]="{'pendente': cliente.status === 'pendente', 'servido': cliente.status === 'servido'}">
        <mat-icon *ngIf="cliente.status === 'pendente'">error</mat-icon>
        <mat-icon *ngIf="cliente.status === 'servido'">check_circle</mat-icon>
        {{ cliente.status | titlecase }}
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
        background: rgba(41, 213, 170, 0.725);
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
        position: fixed;
        bottom: 20px;
        width: 200px;
        right: 20px;
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
      }
      .cliente-phone {
        text-wrap: wrap;
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
      .status-badge.pendente {
        background-color: #ea1e0d;
        color: black;
      }
      .status-badge.servido {
        background-color: #11ea26;
        color: black;
      }
    `,
  ],
  imports: [
    ClienteModalComponent,
    CommonModule,
    MatIconModule
  ],
})
export default class ClienteToastComponent implements OnInit {
  @Input() cliente: any;
  isModalOpen: boolean = false;
  @Output() remove = new EventEmitter<void>();

  ngOnInit() {
    setTimeout(() => {
      this.dismiss();
    }, 5000);
  }

  dismiss() {
    this.remove.emit();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}

