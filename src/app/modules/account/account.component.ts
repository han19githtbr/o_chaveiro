import { CreateRegisterDto, RegisterDto } from '../shared/models/register.dto';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export default class AccountComponent implements OnInit {

  public hide: boolean = true;

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(512)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(512)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(512)]],
      role: ['', Validators.required],
      //status: ['', Validators.required],
      imageUrl: [''],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(512)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerData: CreateRegisterDto = this.registerForm.value;
      console.log('Dados a serem enviados:', registerData);

      this.registerService.createRegister(registerData).subscribe(
        response => {
          this.snackBar.open('Conta criada com sucesso!', 'Fechar', { duration: 3000 });
          this.registerForm.reset();
        },
      );
    }
  }
}
