import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import { PropertyValueComponent } from 'src/app/modules/shared/components/property-value/property-value.component';
import { ProjectButton } from 'src/app/modules/shared/models/button.model';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Notification } from 'src/app/modules/shared/models/notification';
import { PedidoService } from '../../pedido.service';
import { ActivatedRoute } from '@angular/router';
import { EditNotificationModalComponent } from '../edit-notification-modal/edit-notification-modal.component';
import { MatDialog } from '@angular/material/dialog';


const components = [
  CardSectionComponent,
  PropertyValueComponent,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatIconModule,
  FormActionsComponent
];

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ...components],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})

export default class DetailsComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  public notification: Notification | undefined;

  public notifications: Notification[] = [];

  @Output() close = new EventEmitter<void>();
  @Input() public useToggle!: boolean;
  @Input() public useEdit!: boolean;
  @Input() public useDelete!: boolean;


  constructor(
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    const notificationId = +this.route.snapshot.paramMap.get('id')!;
    console.log('ID do Pedido', notificationId)

    this.pedidoService.getNotificationById(notificationId).subscribe((data) => {
      this.notification = data;
      console.log('Detalhes do pedido:', this.notification);
    });
  }


  /*public getStatusLabel(status: string): string {
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


  openEditModal(): void {
    if (this.notification) {
      const dialogRef = this.dialog.open(EditNotificationModalComponent, {
        data: { notification: this.notification },
        panelClass: 'custom-dialog-container',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Recarregue os dados da empresa após a edição, se necessário
          this.ngOnInit();
        }
      });
    }
  }


  // Função para confirmar a exclusão
  public confirmDelete(notification: Notification | null): void {

    if (!notification) {
      console.error('Pedido é nulo');
      return;
    }

    console.log('ID do pedido antes de deletar:', notification.id);


    const snackBarRef = this.snackBar.open(
      `Tem certeza que quer excluir o pedido de: ${notification.name}?`,
      'Confirmar',
      {
        duration: 5000, // Duração do SnackBar
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'], // Classe personalizada
      }
    );


    snackBarRef.onAction().subscribe(() => {
      if (notification.id) {
        const notificationIdNumber = Number(notification.id);
        console.log('ID convertido para número:', notificationIdNumber);
        this.deleteNotification(notificationIdNumber);
      } else {
        console.error('Pedido não tem um ID válido');
      }
    });
  }

  // Função para deletar o administrador
  public deleteNotification(notificationId: number): void {
    console.log('Deletando pedido com ID:', notificationId);

    this.pedidoService.deleteNotificationById(notificationId).subscribe({
      next: () => {
        // Remove o cliente deletado da lista local
        this.notifications = this.notifications.filter((notification) => notification.id !== notificationId);

        // Exibe uma mensagem de sucesso após a exclusão
        this.snackBar.open('Pedido deletado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      },
      error: (err) => {
        console.error('Erro ao deletar o pedido', err);
        this.snackBar.open('Erro ao deletar o pedido', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      },
    });
  }


  closeModal() {
    this.close.emit();
  }

}
