import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ServicosService } from '../../servicos.service';
import { CreateService, UpdateService, Service } from 'src/app/modules/shared/models/service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import FileUploaderComponent from 'src/app/modules/shared/components/file-uploader/file-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FileUploadService } from 'src/app/modules/shared/components/file-uploader/file-upload.service';


@Component({
  selector: 'app-edit-service-modal',
  templateUrl: './edit-service-modal.component.html',
  styleUrls: ['./edit-service-modal.component.scss'],
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
})
export class EditServiceModalComponent implements OnInit {
  serviceForm: FormGroup;
  serviceId!: number;
  //usersAdmin: UserAdmin | undefined;
  public hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private servicoService: ServicosService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public location: Location,
    public dialogRef: MatDialogRef<EditServiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { service: Service }
  ) {
    this.serviceForm = this.fb.group({
      cliente: [''],
      value: [''],
      imageUrl: [''],
      service: [''],
      status: [''],
    });
  }


  ngOnInit(): void {
    if (this.data?.service?.id) {
      this.serviceId = this.data.service.id; // Atribua o id do chaveiro a partir dos dados injetados
    }
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadFile(file).subscribe({
        next: (response) => {
          this.serviceForm.patchValue({ imageUrl: response.filePath });
        },
        error: (err) => {
          this.snackBar.open('Erro ao fazer upload da imagem.', 'Fechar', { duration: 3000 });
          console.error('Erro ao fazer upload da imagem:', err);
        }
      });
    }
  }


  onSubmit(): void {
    if (this.serviceForm.valid) {
      const serviceData: CreateService = this.serviceForm.value;

      const updatedServiceData: UpdateService = {
        cliente: serviceData.cliente || '',  // Forneça um valor padrão vazio se estiver undefined
        value: Number(serviceData.value) || 0,
        imageUrl: serviceData.imageUrl || '',
        service: serviceData.service || '',
        status: serviceData.status || ''
      };

      this.servicoService.updateService(this.serviceId, updatedServiceData).subscribe(
        (response) => {
          this.snackBar.open('Serviço atualizado com sucesso!', 'Fechar', { duration: 3000 });
        },
        (error) => {
          this.snackBar.open('Erro ao atualizar o serviço. Tente novamente.', 'Fechar', { duration: 3000 });
          console.error('Erro ao atualizar o serviço:', error);
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
