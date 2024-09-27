import { ServicosService } from './../../servicos.service';
import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectButton } from 'src/app/modules/shared/models/button.model';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/modules/shared/models/service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditServiceModalComponent } from '../edit-service-modal/edit-service-modal.component';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatIconModule,
    FormActionsComponent
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export default class DetailsComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  @Input() cliente: any;
  @Output() close = new EventEmitter<void>();
  @Input() public useToggle!: boolean;
  @Input() public useEdit!: boolean;
  @Input() public useDelete!: boolean;
  public service: Service | undefined


  public servicos: Service[] = [];

  constructor(
    private servicoService: ServicosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const serviceId = Number(this.route.snapshot.paramMap.get('id'));

    this.servicoService.getServiceById(serviceId).subscribe((data) => {
      this.service = data;
    })

    this.loadServiceById();
  }

  loadServiceById() {
    const serviceId = +this.route.snapshot.paramMap.get('id')!;
    this.servicoService.getServiceById(serviceId).subscribe(response => {
      this.service = response;
      console.log('Detalhes do serviço', this.service);
    })
  }

  openEditModal(): void {
    if (this.service) {
      const dialogRef = this.dialog.open(EditServiceModalComponent, {
        data: { service: this.service },
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


  toggleServiceStatus(): void {
    if (this.service && this.service.id) {
      const newStatus = this.service.status === 'ativo' ? 'inativo' : 'ativo';

      this.servicoService.updateServiceStatus(this.service.id, newStatus).subscribe(
        response => {

          this.service = response;
        },
        error => {
          console.error('Erro ao atualizar o status do serviço', error);
        }
      );
    } else {
      console.error('Chaveiro não encontrado');
    }
  }


  // Função para confirmar a exclusão
  public confirmDelete(servico: Service | null): void {

    if (!servico) {
      console.error('Serviço é nulo');
      return;
    }

    console.log('ID do serviço antes de deletar:', servico.id);


    const snackBarRef = this.snackBar.open(
      `Quer excluir mesmo o serviço solicitado por: ${servico.cliente}?`,
      'Confirmar',
      {
        duration: 5000, // Duração do SnackBar
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'], // Classe personalizada
      }
    );


    snackBarRef.onAction().subscribe(() => {
      if (servico.id) {
        const servicoIdNumber = Number(servico.id);
        console.log('ID convertido para número:', servicoIdNumber);
        this.deleteService(servicoIdNumber);
      } else {
        console.error('Serviço não tem um ID válido');
      }
    });
  }

  // Função para deletar o serviço
  public deleteService(servicoId: number): void {
    console.log('Deletando serviço com ID:', servicoId);

    this.servicoService.deleteServiceById(servicoId).subscribe({
      next: () => {
        // Remove o serviço deletado da lista local
        this.servicos = this.servicos.filter((servico) => servico.id !== servicoId);

        // Exibe uma mensagem de sucesso após a exclusão
        this.snackBar.open('Serviço deletado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      },
      error: (err) => {
        console.error('Erro ao deletar o serviço', err);
        this.snackBar.open('Erro ao deletar o serviço', 'Fechar', {
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
