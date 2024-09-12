import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';

@Component({
  selector: 'app-cliente-modal-notification',
  template: `
    <div class="modal-overlay">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="card-section">
          <div class="row items-center">
            <ng-container>
              <mat-icon>edit</mat-icon>
            </ng-container>
            <ng-container>
              <mat-slide-toggle
                color="primary"
                matTooltip="Alterar status"
                [checked]="notification?.status === 'pendente'"
                (change)="toggleNotificationStatus()"
              >

              </mat-slide-toggle>
            </ng-container>
            <ng-container>
              <mat-icon>delete_outline</mat-icon>
            </ng-container>
          </div>
        </div>

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
          <mat-icon>check_circle</mat-icon>
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
    </div>
  `,
  styles: [`

    .row {
      padding-bottom: 20px;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      //background-color: rgb(255, 255, 255);
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }

    .modal-content {
      background: rgb(225, 223, 223);
      padding: 20px;
      border-radius: 8px;
      max-width: 90%; /* Limita a largura máxima do modal */
      max-height: 90%; /* Limita a altura máxima do modal */
      overflow-y: auto; /* Adiciona rolagem para conteúdo excedente */
      position: relative;
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
      color: #0000ff;
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
      width: 270px;
      height: 250px;
      max-width: 300px;
      max-height: 200px;
      margin-left: 8px;
      border-radius: 10%;
    }

    .close-button {
      margin-top: 20px;
      background-color: #ea172d;
      width: 100%;
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
  imports: [MatIconModule, MatSlideToggleModule]  // Adicione o MatIconModule para uso de ícones
})
export class ClienteModalNotificationComponent {
  @Input() notification: any;
  @Input() public useToggle!: boolean;
  @Input() public useEdit!: boolean;
  @Input() public useDelete!: boolean;

  constructor(
    public dialogRef: MatDialogRef<ClienteModalNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    const notificationId = Number(this.route.snapshot.paramMap.get('id'));

    this.notificationService.fetchNotificationById(notificationId).subscribe((data) => {
      this.notification = data;
    })
  }

  toggleNotificationStatus(): void {
    if (this.notification && this.notification.id) {
      const newStatus = this.notification.status === 'servido' ? 'pendente' : 'servido';

      this.notificationService.updateNotificationStatus(this.notification.id, newStatus).subscribe(
        response => {

          this.notification = response;
        },
        error => {
          console.error('Erro ao atualizar o status do cliente', error);
        }
      );
    } else {
      console.error('Cliente não encontrado');
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
