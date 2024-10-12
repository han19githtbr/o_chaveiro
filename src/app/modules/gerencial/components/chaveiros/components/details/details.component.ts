import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import { PropertyValueComponent } from 'src/app/modules/shared/components/property-value/property-value.component';
import { ProjectButton } from 'src/app/modules/shared/models/button.model';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
  public chaveiro: Chaveiro | undefined;

  public chaveiros: Chaveiro[] = [];

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    const chaveiroId = Number(this.route.snapshot.paramMap.get('id'));

    this.chaveiroService.getChaveiroById(chaveiroId).subscribe((data) => {
      this.chaveiro = data;
    });

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


  // Função para confirmar a exclusão
  public confirmDelete(chaveiro: Chaveiro | null): void {

    if (!chaveiro) {
      console.error('Chaveiro é nulo');
      return;
    }

    console.log('ID do chaveiro antes de deletar:', chaveiro.id);

    const snackBarRef = this.snackBar.open(
      `Tem certeza que quer excluir o chaveiro: ${chaveiro.name}?`,
      'Confirmar',
      {
        duration: 5000, // Duração do SnackBar
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'],
      }
    );

    // Listener para a ação de confirmar
    snackBarRef.onAction().subscribe(() => {
      if (chaveiro.id) {
        const chaveiroIdNumber = Number(chaveiro.id);
        console.log('ID convertido para número:', chaveiroIdNumber);
        this.deleteChaveiro(chaveiroIdNumber);
      } else {
        console.error('Chaveiro não tem um ID válido');
      }
    });
  }

  // Função para deletar o chaveiro
  public deleteChaveiro(chaveiroId: number): void {
    this.chaveiroService.deleteChaveiroById(chaveiroId).subscribe({
      next: () => {
        // Remove o chaveiro deletado da lista local
        this.chaveiros = this.chaveiros.filter((chaveiro) => chaveiro.id !== chaveiroId);

        // Exibe uma mensagem de sucesso após a exclusão
        this.snackBar.open('Chaveiro deletado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      },
      error: (err) => {
        console.error('Erro ao deletar o chaveiro', err);
        this.snackBar.open('Erro ao deletar o chaveiro', 'Fechar', {
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
