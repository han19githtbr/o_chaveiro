import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicosService } from '../../servicos.service';
import { Service, CreateService, UpdateService } from 'src/app/modules/shared/models/service';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { LoadingEffectComponent } from 'src/app/modules/shared/components/loading-effect/loading-effect.component';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    LoadingEffectComponent,
    FormActionsComponent,
    CardSectionComponent,
  ],
})
export default class AddComponent implements OnInit{

  serviceForm!: FormGroup;

  serviceId: number | null = null;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private servicoService: ServicosService,
    private loadingService: LoadingService,
    private http: HttpClient,
  ){
    this.serviceForm = this.fb.group({
      cliente: ['', Validators.required],
      value: ['', Validators.required],
      service: ['copia', Validators.required],
      imageUrl: [''],
      status: ['ativo', Validators.required],
    });
  }


  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')! : null;

    if (this.serviceId) {
      this.fetchServiceDetails();
      console.log('ID do serviço:', this.serviceId);
    }
  }


  fetchServiceDetails(): void {
    if (this.serviceId) {
      this.servicoService.getServiceById(this.serviceId).subscribe(
        (service) => {
          this.serviceForm.patchValue(service);
        },
        (error) => {
          console.error('Erro ao buscar detalhes do serviço', error);
        }
      );
    }
  }


  onSubmit(): void {
    if (this.serviceForm.valid) {
      const formData: CreateService = this.serviceForm.value;

      // Mostra o efeito de loading
      this.loadingService.showLoading();

      // Define um delay aleatório entre 1 e 5 segundos
      const delay = Math.random() * (5000 - 1000) + 1000;

      if (this.serviceId) {
        // Atualização
        this.servicoService.updateService(this.serviceId, formData).subscribe(
          () => {
            setTimeout(() => {
              // Esconde o efeito de loading
              this.loadingService.hideLoading();
              this.router.navigate(['/gerencial/servicos']);
              this.snackBar.open('Serviço atualizado com sucesso.', '', { duration: 3000 });
            }, delay);
          },
          (error) => {
            setTimeout(() => {
              // Esconde o efeito de loading
              this.loadingService.hideLoading();
              console.error('Erro ao atualizar serviço:', error);
              this.snackBar.open('Erro ao atualizar serviço.', '', { duration: 3000 });
            }, delay);
          }
        );
      } else {
        // Criação
        this.servicoService.createService(formData).subscribe(
          () => {
            setTimeout(() => {
              // Esconde o efeito de loading
              this.loadingService.hideLoading();
              this.router.navigate(['/gerencial/servicos']);
              this.snackBar.open('Serviço criado com sucesso.', '', { duration: 3000 });
            }, delay);
          },
          (error) => {
            setTimeout(() => {
              // Esconde o efeito de loading
              this.loadingService.hideLoading();
              console.error('Erro ao criar serviço:', error);
              this.snackBar.open('Erro ao criar serviço.', '', { duration: 3000 });
            }, delay);
          }
        );
      }
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
    }
  }
}
