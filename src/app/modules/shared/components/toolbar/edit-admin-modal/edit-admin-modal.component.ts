import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SettingsService } from 'src/app/modules/gerencial/components/settings/settings.service';
//import { ChaveiroService } from '../../chaveiros.service';
//import { Chaveiro, CreateChaveiro, UpdateChaveiro } from 'src/app/modules/shared/models/chaveiro';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import FileUploaderComponent from 'src/app/modules/shared/components/file-uploader/file-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FileUploadService } from 'src/app/modules/shared/components/file-uploader/file-upload.service';
import { UserAdmin, UpdateAdmin, Permission } from '../../../../shared/models/userAdmin';


@Component({
  selector: 'app-edit-admin-modal',
  templateUrl: './edit-admin-modal.component.html',
  styleUrls: ['./edit-admin-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    CardSectionComponent,
    MatSlideToggleModule,
    FileUploaderComponent
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export default class EditAdminModalComponent implements OnInit {
  adminForm: FormGroup;
  userId!: number;
  //usersAdmin: UserAdmin | undefined;
  permissionsList: Permission[] = [];
  public hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public location: Location,
    public dialogRef: MatDialogRef<EditAdminModalComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { admin: UserAdmin }
  ) {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(512)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]],
      status: ['', Validators.required],
      permissions: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    if (this.data?.admin?.id) {
      this.userId = this.data.admin.id;

      this.adminForm.patchValue({
        name: this.data.admin.name || '',
        email: this.data.admin.email || '',
        imageUrl: this.data.admin.imageUrl || '',
        status: this.data.admin.status || '',
        permissions: this.data.admin.permissions.map((permission: Permission) => permission.id) || []
      });

    }
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadFile(file).subscribe({
        next: (response) => {
          this.adminForm.patchValue({ imageUrl: response.filePath });
        },
        error: (err) => {
          this.snackBar.open('Erro ao fazer upload da imagem.', 'Fechar', { duration: 3000 });
          console.error('Erro ao fazer upload da imagem:', err);
        }
      });
    }
  }


  onSubmit(): void {
    if (this.adminForm.valid) {
      const formValues = this.adminForm.value;

      const adminData: UpdateAdmin = {
        name: formValues.name || this.data.admin.name,
        imageUrl: formValues.imageUrl || this.data.admin.imageUrl,
        status: formValues.status || this.data.admin.status,
        email: formValues.email || this.data.admin.email,
        permissions: formValues.permissions.map((permission: Permission) => permission.id)
      };

      this.settingsService.update(this.userId, adminData).subscribe(
        (response) => {
          this.snackBar.open('Administrador atualizado com sucesso!', 'Fechar', { duration: 3000 });
        },
        (error) => {
          this.snackBar.open('Erro ao atualizar o administrador. Tente novamente.', 'Fechar', { duration: 3000 });
          console.error('Erro ao atualizar o administrador:', error);
        }
      );
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
