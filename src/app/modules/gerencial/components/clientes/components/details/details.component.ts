import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import { PropertyValueComponent } from 'src/app/modules/shared/components/property-value/property-value.component';
import { ProjectButton } from 'src/app/modules/shared/models/button.model';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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


  /*toggleClientStatus(): void {
    if (this.cliente && this.cliente.id) {
      const newStatus = this.cliente.status === 'ativo' ? 'inativo' : 'ativo';

      this.clientService.updateClientStatus(this.cliente.id, newStatus).subscribe(
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
  }*/


  closeModal() {
    this.close.emit();
  }

}
