import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import { PropertyValueComponent } from 'src/app/modules/shared/components/property-value/property-value.component';
import { ProjectButton } from 'src/app/modules/shared/models/button.model';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Chaveiro } from 'src/app/modules/shared/models/chaveiro';
import { ChaveiroService } from '../../chaveiros.service';
import { ActivatedRoute } from '@angular/router';
import { EditChaveiroModalComponent } from '../edit-chaveiro-modal/edit-chaveiro-modal.component';
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
  public chaveiro: Chaveiro | undefined;
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
    private chaveiroService: ChaveiroService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    const chaveiroId = Number(this.route.snapshot.paramMap.get('id'));

    this.chaveiroService.getChaveiroById(chaveiroId).subscribe((data) => {
      this.chaveiro = data;
    });

    this.loadChaveiroById();
  }


  loadChaveiroById() {
    const chaveiroId = +this.route.snapshot.paramMap.get('id')!;
    this.chaveiroService.getChaveiroById(chaveiroId).subscribe(response => {
      this.chaveiro = response;
      console.log('Detalhes do serviço', this.chaveiro);
    })
  }


  openEditModal(): void {
    if (this.chaveiro) {
      const dialogRef = this.dialog.open(EditChaveiroModalComponent, {
        data: { chaveiro: this.chaveiro },
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

  toggleChaveiroStatus(): void {
    if (this.chaveiro && this.chaveiro.id) {
      const newStatus = this.chaveiro.status === 'ativo' ? 'inativo' : 'ativo';

      this.chaveiroService.updateChaveiroStatus(this.chaveiro.id, newStatus).subscribe(
        response => {

          this.chaveiro = response;
        },
        error => {
          console.error('Erro ao atualizar o status do chaveiro', error);
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
