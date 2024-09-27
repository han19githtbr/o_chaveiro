import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import { PropertyValueComponent } from 'src/app/modules/shared/components/property-value/property-value.component';
import { ProjectButton } from 'src/app/modules/shared/models/button.model';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from 'src/app/modules/shared/models/cliente';
import { ClientService } from '../../client.service';
import { ActivatedRoute } from '@angular/router';
import { EditClientModalComponent } from '../edit-client-modal/edit-client-modal.component';
import { MatDialog } from '@angular/material/dialog';


const components = [
  CardSectionComponent,
  PropertyValueComponent,
  MatSlideToggleModule,
  MatSnackBarModule,
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
  public cliente: Cliente | undefined;

  public clientes: Cliente[] = [];

  @Output() close = new EventEmitter<void>();
  @Input() public useToggle!: boolean;
  @Input() public useEdit!: boolean;
  @Input() public useDelete!: boolean;

  public projectButtons: ProjectButton[] = [
    {
      text: 'Adicionar chaveiro',
      type: 'fill'
    }
  ]

  constructor(
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    const clientId = +this.route.snapshot.paramMap.get('id')!;
    console.log('ID do Cliente', clientId)

    this.clientService.getClientById(clientId).subscribe((data) => {
      this.cliente = data;
      console.log('Detalhes do cliente:', this.cliente);
    });
  }


  openEditModal(): void {
    if (this.cliente) {
      const dialogRef = this.dialog.open(EditClientModalComponent, {
        data: { cliente: this.cliente },
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
  public confirmDelete(cliente: Cliente | null): void {

    if (!cliente) {
      console.error('Pedido é nulo');
      return;
    }

    console.log('ID do pedido antes de deletar:', cliente.id);


    const snackBarRef = this.snackBar.open(
      `Tem certeza que quer excluir o cliente: ${cliente.name}?`,
      'Confirmar',
      {
        duration: 5000, // Duração do SnackBar
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'], // Classe personalizada
      }
    );


    snackBarRef.onAction().subscribe(() => {
      if (cliente.id) {
        const clienteIdNumber = Number(cliente.id);
        console.log('ID convertido para número:', clienteIdNumber);
        this.deleteClient(clienteIdNumber);
      } else {
        console.error('Cliente não tem um ID válido');
      }
    });
  }

  // Função para deletar o cliente
  public deleteClient(clienteId: number): void {
    console.log('Deletando cliente com ID:', clienteId);

    this.clientService.deleteClienteById(clienteId).subscribe({
      next: () => {
        // Remove o cliente deletado da lista local
        this.clientes = this.clientes.filter((cliente) => cliente.id !== clienteId);

        // Exibe uma mensagem de sucesso após a exclusão
        this.snackBar.open('Cliente deletado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      },
      error: (err) => {
        console.error('Erro ao deletar o cliente', err);
        this.snackBar.open('Erro ao deletar o cliente', 'Fechar', {
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
