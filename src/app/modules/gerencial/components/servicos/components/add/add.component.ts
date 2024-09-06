import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicosService } from '../../servicos.service';
import { Service, CreateService, UpdateService } from 'src/app/modules/shared/models/service';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';


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
    MatFormFieldModule,
    FormActionsComponent,
    CardSectionComponent,
  ],
})
export default class AddComponent implements OnInit{

  serviceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private servicoService: ServicosService,
    private loadingService: LoadingService,
  ){
    this.serviceForm = this.fb.group({
      cliente: ['', Validators.required],
      value: ['', Validators.required],
      pedidoDate: ['', Validators.required],
      service: ['copia', Validators.required],
      imageUrl: [''],
      status: ['ativo', Validators.required],
    });
  }


  ngOnInit(): void {

  }


  public onSubmit(): void {
    this.loadingService.showLoading();

    if (this.serviceForm.valid) {
      const serviceData: CreateService = this.serviceForm.value;

      this.servicoService.createService(serviceData).subscribe(
        (response) => {
          const delay = Math.random() * (5000 - 1000) + 1000;

          setTimeout(() => {
            this.loadingService.hideLoading();
            this.snackBar.open('Serviço criado com sucesso!', 'Fechar', { duration: 3000 });
          }, delay);
        },
        (error) => {
          this.snackBar.open('Erro ao criar o serviço. Tente novamente.', 'Fechar', { duration: 3000 });
          console.error('Erro ao criar o serviço:', error);
        }
      );
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
    }
  }

}
