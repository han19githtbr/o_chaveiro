import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-cliente-modal-notification',
  template: `
    <div class="modal-container">
      <h2>Detalhes do Cliente</h2>
      <div class="detail-item">
        <mat-icon>image</mat-icon>
        <span>Foto:</span>
        <img [src]="data.imageUrl" alt="Foto do Cliente" class="client-image"/>
      </div>
      <div class="detail-item">
        <mat-icon>person</mat-icon>
        <span>Nome:</span>
        <span class="name">{{ data.name }}</span>
      </div>
      <div class="detail-item">
        <mat-icon>location_on</mat-icon>
        <span>Endereço:</span>
        <span class="endereco">{{ data.endereco }}</span>
      </div>
      <div class="detail-item">
        <mat-icon>phone</mat-icon>
        <span>Telefone:</span>
        <span class="telefone">{{ data.phone }}</span>
      </div>
      <div class="detail-item">
        <mat-icon>status</mat-icon>
        <span>Status:</span>
        <span class="status">{{ data.status }}</span>
      </div>

      <div class="detail-item">
        <mat-icon>build</mat-icon>
        <span>Serviço:</span>
        <span class="service">{{ data.service }}</span>
      </div>
      <button mat-button (click)="closeModal()" class="close-button">Fechar</button>
    </div>
  `,
  styles: [`
    .modal-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      max-width: 400px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      margin: 10px 0;
      font-size: 16px;
      width: 100%;
    }

    .detail-item mat-icon {
      margin-right: 8px;
      color: #3f51b5;
    }
    .name {
      font-weight: bold;
      margin-left: 10px;
    }

    .endereco {
      font-weight: bold;
      margin-left: 10px;
    }

    .status {
      font-weight: bold;
      margin-left: 10px;
    }

    .telefone {
      font-weight: bold;
      margin-left: 10px;
    }

    .service {
      font-weight: bold;
      margin-left: 10px;
    }

    .client-image {
      width: 250px;
      height: 250px;
      max-width: 300px;
      max-height: 200px;
      margin-left: 8px;
      border-radius: 50%;
    }

    .close-button {
      margin-top: 20px;
      background-color: #ea172d;
      width: 200px;
      border-radius: 4px;
      border: 1px solid black;
      color: black;
    }

    .close-button:hover {
      background-color: #ff8a8a;
      cursor: pointer;
    }
  `],
  standalone: true,
  imports: [MatIconModule]  // Adicione o MatIconModule para uso de ícones
})
export class ClienteModalNotificationComponent {
  @Input() notification: any;

  constructor(
    public dialogRef: MatDialogRef<ClienteModalNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
