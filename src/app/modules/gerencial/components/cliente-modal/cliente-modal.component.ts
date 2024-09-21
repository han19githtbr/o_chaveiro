import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from 'src/app/modules/shared/models/cliente';
import { DashboardService } from '../dashboard/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import ClienteToastComponent from '../cliente-toast/cliente-toast.component';
//import { EditClientModalComponent } from './components/edit-client-modal/edit-client-modal.component';
//import { EditClientModalComponent } from '../clientes/components/edit-client-modal/edit-client-modal.component';


@Component({
  selector: 'app-cliente-modal',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    CommonModule,
    ClienteToastComponent,
    MatIconModule
  ],
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.scss'],
})
export class ClienteModalComponent {
  //@Input() cliente: Cliente | null = null;
  @Output() close = new EventEmitter<void>();
  @Input() public useToggle!: boolean;
  @Input() public useEdit!: boolean;
  @Input() public useDelete!: boolean;
  //newClient: Cliente | null = null;
  @Input() cliente: Cliente | undefined;
  //public cliente: Cliente | undefined;


  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {
    const clientId = Number(this.route.snapshot.paramMap.get('id'));

    this.dashboardService.getClientById(clientId).subscribe((data) => {
      this.cliente = data;
    })
  }


  toggleClientStatus(): void {
    if (this.cliente && this.cliente.id) {
      let newStatus: string;

      // Alterna ciclicamente entre 'pendente', 'ativo' e 'inativo'
      switch (this.cliente.status) {
        case 'pendente':
          newStatus = 'ativo';
          break;
        case 'ativo':
          newStatus = 'inativo';
          break;
        case 'inativo':
        default:
          newStatus = 'pendente';
          break;
      }

      // Atualiza o status do cliente
      this.dashboardService.updateClientStatus(this.cliente.id, newStatus).subscribe(
        response => {
          this.cliente = response;
        },
        error => {
          console.error('Erro ao atualizar o status do cliente', error);
        }
      );
    } else {
      console.error('Cliente não encontrado');
    }
  }


  /*openEditModal(): void {
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
  }*/


  closeModal() {
    this.close.emit();
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

}
