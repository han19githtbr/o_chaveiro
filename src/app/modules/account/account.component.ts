import { CreateRegisterDto, RegisterDto } from '../shared/models/register.dto';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { TypeFile } from 'src/app/modules/shared/enums/type-file.enum';
//import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './register.service';
import FileUploaderComponent from 'src/app/modules/shared/components/file-uploader/file-uploader.component';
import { FileUploadService } from 'src/app/modules/shared/components/file-uploader/file-upload.service';



@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    FileUploaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export default class AccountComponent implements OnInit {

  form!: FormGroup;

  TypeFile = TypeFile;

  public hide: boolean = true;

  registerForm: FormGroup;

  constructor(
    //public dialogRef: MatDialogRef<AccountComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private fileUploaderService: FileUploadService,
    private snackBar: MatSnackBar,
    //private dialog: MatDialog
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

  /*openFileUploader(): void {
    const dialogRef = this.dialog.open(FileUploaderComponent, {
      width: '420px',
      height: '170px'
    });

    dialogRef.afterClosed().subscribe((result: string | null) => {
      if (result) {

        this.registerForm.get('imageUrl')?.setValue(result);

        this.registerForm.get('imageUrl')?.markAsDirty();
        this.registerForm.get('imageUrl')?.updateValueAndValidity();
      }
    });
  }*/


  onFileChange(event: File[]): void {
    if (event && event.length > 0) {
      const file = event[0];

      this.fileUploaderService.uploadFile(file).subscribe(
        (response) => {
          const imageUrl = response.url;  // Usar a URL gerada pelo backend
          this.registerForm.get('imageUrl')?.setValue(imageUrl);  // Atualizar o campo com a URL completa
          console.log('URL da Imagem:', imageUrl);
        },
        (error) => {
          console.error('Erro ao fazer o upload da imagem:', error);
        }
      );
    }
  }


}
