import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateChaveiro } from 'src/app/modules/shared/models/chaveiro';
import { ChaveiroService } from '../../chaveiros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Chaveiro } from 'src/app/modules/shared/models/chaveiro';
import { HttpClient } from '@angular/common/http';
import { LoadingEffectComponent } from 'src/app/modules/shared/components/loading-effect/loading-effect.component';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import ButtonComponent from 'src/app/modules/shared/components/button/button.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    FormActionsComponent,
    ButtonComponent,
    CardSectionComponent,
  ],
})
export default class AddComponent {
  chaveiroForm!: FormGroup;

  chaveiroId: number | null = null;

  location = inject(Location);

  @Input() tooltipTextInvalid: string = '';
  @Input() showSaveButton: boolean = true;
  @Output() clickSaveEvent: EventEmitter<any> = new EventEmitter<any>();

  public back(): void {
    this.location.back();
  }

  constructor(
    private fb: FormBuilder,
    private chaveiroService: ChaveiroService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.chaveiroForm = this.fb.group({
      name: ['', Validators.required],
      endereco: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: [''],
      status: ['disponivel', Validators.required],
    });
  }

  ngOnInit(): void {
    this.chaveiroId = this.route.snapshot.paramMap.get('id')
      ? +this.route.snapshot.paramMap.get('id')!
      : null;

    if (this.chaveiroId) {
      this.fetchChaveiroDetails();
      console.log('ID do chaveiro:', this.chaveiroId);
    }
  }

  fetchChaveiroDetails(): void {
    if (this.chaveiroId) {
      this.chaveiroService.getChaveiroById(this.chaveiroId).subscribe(
        (chaveiro) => {
          this.chaveiroForm.patchValue(chaveiro);
        },
        (error) => {
          console.error('Erro ao buscar detalhes do chaveiro', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.chaveiroForm.valid) {
      const formData: CreateChaveiro = this.chaveiroForm.value;

      // Mostra o efeito de loading
      this.loadingService.showLoading();

      if (this.chaveiroId) {
        // Atualização

        this.chaveiroService
          .updateChaveiro(this.chaveiroId, formData)
          .subscribe(
            () => {
              // Define um delay aleatório entre 1 e 5 segundos
              const delay = Math.random() * (5000 - 1000) + 1000;

              setTimeout(() => {
                // Esconde o efeito de loading
                this.loadingService.hideLoading();
                this.router.navigate(['/gerencial/chaveiros']);
                this.snackBar.open('Chaveiro atualizado com sucesso.', '', {
                  duration: 3000,
                });
              }, delay);
            },
            (error) => {
              // Define um delay aleatório entre 1 e 5 segundos
              const delay = Math.random() * (5000 - 1000) + 1000;

              setTimeout(() => {
                // Esconde o efeito de loading
                this.loadingService.hideLoading();
                console.error('Erro ao atualizar chaveiro:', error);
                this.snackBar.open('Erro ao atualizar chaveiro.', '', {
                  duration: 3000,
                });
              }, delay);
            }
          );
      } else {
        // Criação
        this.chaveiroService.createChaveiro(formData).subscribe(
          () => {
            // Define um delay aleatório entre 1 e 5 segundos
            const delay = Math.random() * (5000 - 1000) + 1000;

            setTimeout(() => {
              // Esconde o efeito de loading
              this.loadingService.hideLoading();
              this.router.navigate(['/gerencial/chaveiros']);
              this.snackBar.open('Chaveiro criado com sucesso.', '', {
                duration: 3000,
              });
            }, delay);
          },
          (error) => {
            // Define um delay aleatório entre 1 e 5 segundos
            const delay = Math.random() * (5000 - 1000) + 1000;

            setTimeout(() => {
              // Esconde o efeito de loading
              this.loadingService.hideLoading();
              console.error('Erro ao criar chaveiro:', error);
              this.snackBar.open('Erro ao criar chaveiro.', '', {
                duration: 3000,
              });
            }, delay);
          }
        );
      }
    } else {
      this.snackBar.open(
        'Por favor, preencha todos os campos obrigatórios.',
        'Fechar',
        { duration: 3000 }
      );
    }
  }
}
