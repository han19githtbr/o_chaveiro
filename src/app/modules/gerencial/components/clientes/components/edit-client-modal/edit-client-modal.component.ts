import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientService } from '../../client.service';
import { Cliente, CreateCliente, UpdateCliente } from 'src/app/modules/shared/models/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import FileUploaderComponent from 'src/app/modules/shared/components/file-uploader/file-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FileUploadService } from 'src/app/modules/shared/components/file-uploader/file-upload.service';


@Component({
  selector: 'app-edit-client-modal',
  templateUrl: './edit-client-modal.component.html',
  styleUrls: ['./edit-client-modal.component.scss'],
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
export class EditClientModalComponent implements OnInit {
  clientForm: FormGroup;
  clienteId!: number;
  //usersAdmin: UserAdmin | undefined;
  public hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public location: Location,
    public dialogRef: MatDialogRef<EditClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente }
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      endereco: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]],
      phone: ['', Validators.required],
      service: ['', Validators.required],
      status: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    if (this.data?.cliente?.id) {
      this.clienteId = this.data.cliente.id;

      this.clientForm.patchValue({
        name: this.data.cliente.name || '',
        endereco: this.data.cliente.endereco || '',
        imageUrl: this.data.cliente.imageUrl || '',
        phone: this.data.cliente.phone || '',
        service: this.data.cliente.service || '',
        status: this.data.cliente.status || ''
      });

    }
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadFile(file).subscribe({
        next: (response) => {
          this.clientForm.patchValue({ imageUrl: response.filePath });
        },
        error: (err) => {
          this.snackBar.open('Erro ao fazer upload da imagem.', 'Fechar', { duration: 3000 });
          console.error('Erro ao fazer upload da imagem:', err);
        }
      });
    }
  }


  onSubmit(): void {
    if (this.clientForm.valid) {
      const formValues = this.clientForm.value;

      const clientData: UpdateCliente = {
        name: formValues.name || this.data.cliente.name,
        endereco: formValues.endereco || this.data.cliente.endereco,
        imageUrl: formValues.imageUrl || this.data.cliente.imageUrl,
        phone: formValues.phone || this.data.cliente.phone,
        service: formValues.service || this.data.cliente.service,
        status: formValues.status || this.data.cliente.status,
      };

      this.clientService.updateClient(this.clienteId, clientData).subscribe(
        (response) => {
          this.snackBar.open('Cliente atualizado com sucesso!', 'Fechar', { duration: 3000 });
        },
        (error) => {
          this.snackBar.open('Erro ao atualizar o cliente. Tente novamente.', 'Fechar', { duration: 3000 });
          console.error('Erro ao atualizar o cliente:', error);
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
