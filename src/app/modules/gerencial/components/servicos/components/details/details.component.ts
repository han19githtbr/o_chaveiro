import { ServicosService } from './../../servicos.service';
import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectButton } from 'src/app/modules/shared/models/button.model';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/modules/shared/models/service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditServiceModalComponent } from '../edit-service-modal/edit-service-modal.component';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
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

  constructor(
    private servicoService: ServicosService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const serviceId = Number(this.route.snapshot.paramMap.get('id'));

    this.servicoService.getServiceById(serviceId).subscribe((data) => {
      this.service = data;
    })

    //this.loadServiceById();
  }

  /*loadServiceById() {
    const serviceId = +this.route.snapshot.paramMap.get('id')!;
    this.servicoService.getServiceById(serviceId).subscribe(response => {
      this.service = response;
      console.log('Detalhes do serviço', this.service);
    })
  }*/

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


  closeModal() {
    this.close.emit();
  }
}
