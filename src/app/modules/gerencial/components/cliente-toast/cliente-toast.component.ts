// cliente-toast.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClienteModalComponent } from '../cliente-modal/cliente-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-toast',
  standalone: true,
  template: `
    <div class="cliente-toast" (click)="openModal()"> <!-- Adicionado evento de clique -->
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
        width: 180px;
        right: 20px;
        z-index: 1000;
        border-radius: 5px;
        cursor: pointer; /* Adiciona um cursor de ponteiro para indicar que é clicável */
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
    `,
  ],
  imports: [
    ClienteModalComponent,
    CommonModule,
  ],
})
export default class ClienteToastComponent implements OnInit {
  @Input() cliente: any;
  isModalOpen: boolean = false; // Flag para controlar o modal
  @Output() remove = new EventEmitter<void>();

  ngOnInit() {
    setTimeout(() => {
      this.dismiss();
    }, 5000); // Remover após 5 segundos
  }

  dismiss() {
    this.remove.emit();
  }

  openModal() {
    this.isModalOpen = true; // Abre o modal ao clicar no toast
  }

  closeModal() {
    this.isModalOpen = false; // Fecha o modal
  }
}

