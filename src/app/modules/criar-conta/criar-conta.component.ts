import { CreateRegisterDto, RegisterDto } from '../shared/models/register.dto';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './register.service';
import { LoadingService } from '../shared/services/loading.service';
import { LoadingEffectComponent } from "../shared/components/loading-effect/loading-effect.component";


@Component({
  selector: 'app-criar-conta',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    LoadingEffectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss']
})
export default class CriarContaComponent implements OnInit {

  public hide: boolean = true;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(512)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(512)]],
      role: ['', Validators.required],
      status: ['ativo', Validators.required],
      imageUrl: [''],
      birthDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(512)]],
    });

  }

  ngOnInit(): void {}


  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loadingService.showLoading();

      const registerData: CreateRegisterDto = this.registerForm.value;
      console.log('Dados a serem enviados:', registerData);

      this.registerService.createRegister(registerData).subscribe(
        response => {
          const delay = Math.random() * (5000 - 1000) + 1000;

          setTimeout(() => {
            this.loadingService.hideLoading();
            this.snackBar.open('Conta criada com sucesso!', 'Fechar', { duration: 3000 });
            this.registerForm.reset();
          }, delay);
        },
      );
    }
  }
}
