import { Cliente } from './../../../../../shared/models/cliente';
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
import { CreateCliente } from 'src/app/modules/shared/models/cliente';
import { ClientService } from '../../client.service';
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
    ButtonComponent,
    MatInputModule,
    //FormActionsComponent,
    CardSectionComponent,
  ],
})
export default class AddComponent {
  clientForm!: FormGroup;

  clientId: number | null = null;

  location = inject(Location);

  @Input() tooltipTextInvalid: string = '';
  @Input() showSaveButton: boolean = true;
  @Output() clickSaveEvent: EventEmitter<any> = new EventEmitter<any>();

  public back(): void {
    this.location.back();
  }

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      endereco: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      service: ['', Validators.required],
      imageUrl: [''],
      status: ['servido', Validators.required],
    });
  }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id')
      ? +this.route.snapshot.paramMap.get('id')!
      : null;

    if (this.clientId) {
      this.fetchClientDetails();
      console.log('ID do cliente:', this.clientId);
    }
  }

  fetchClientDetails(): void {
    if (this.clientId) {
      this.clientService.getClientById(this.clientId).subscribe(
        (cliente) => {
          this.clientForm.patchValue(cliente);
        },
        (error) => {
          console.error('Erro ao buscar detalhes do cliente', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const formData: CreateCliente = this.clientForm.value;

      // Mostra o efeito de loading
      this.loadingService.showLoading();

      if (this.clientId) {
        // Atualização
        this.clientService.updateClient(this.clientId, formData).subscribe(
          () => {
            // Define um delay aleatório entre 1 e 5 segundos
            const delay = Math.random() * (5000 - 1000) + 1000;

            setTimeout(() => {
              // Esconde o efeito de loading
              this.loadingService.hideLoading();
              this.router.navigate(['/gerencial/clientes']);
              this.snackBar.open('Cliente atualizado com sucesso.', '', {
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
              console.error('Erro ao atualizar o cliente:', error);
              this.snackBar.open('Erro ao atualizar o cliente.', '', {
                duration: 3000,
              });
            }, delay);
          }
        );
      } else {
        // Criação
        this.clientService.createClient(formData).subscribe(
          () => {
            // Define um delay aleatório entre 1 e 5 segundos
            const delay = Math.random() * (5000 - 1000) + 1000;

            setTimeout(() => {
              // Esconde o efeito de loading
              this.loadingService.hideLoading();
              this.router.navigate(['/gerencial/clientes']);
              this.snackBar.open('Cliente criado com sucesso.', '', {
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
              console.error('Erro ao criar cliente:', error);
              this.snackBar.open('Erro ao criar cliente.', '', {
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
