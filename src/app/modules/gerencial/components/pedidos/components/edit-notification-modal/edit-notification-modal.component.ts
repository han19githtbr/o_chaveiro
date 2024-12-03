import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { PedidoService } from '../../pedido.service';
//import { Cliente, CreateCliente, UpdateCliente } from 'src/app/modules/shared/models/cliente';
import {
  Notification,
  UpdateNotification,
} from 'src/app/modules/shared/models/notification';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import FileUploaderComponent from 'src/app/modules/shared/components/file-uploader/file-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FileUploadService } from 'src/app/modules/shared/components/file-uploader/file-upload.service';

@Component({
  selector: 'app-edit-notification-modal',
  templateUrl: './edit-notification-modal.component.html',
  styleUrls: ['./edit-notification-modal.component.scss'],
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
    FileUploaderComponent,
  ],
})
export class EditNotificationModalComponent implements OnInit {
  notificationForm: FormGroup;
  notificationId!: number;
  //usersAdmin: UserAdmin | undefined;
  public hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public location: Location,
    public dialogRef: MatDialogRef<EditNotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { notification: Notification }
  ) {
    this.notificationForm = this.fb.group({
      name: ['', Validators.required],
      endereco: ['', Validators.required],
      imageUrl: [
        '',
        [
          Validators.required,
          Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/),
        ],
      ],
      service: ['', Validators.required],
      phone: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data?.notification?.id) {
      this.notificationId = this.data.notification.id;

      this.notificationForm.patchValue({
        name: this.data.notification.name || '',
        endereco: this.data.notification.endereco || '',
        imageUrl: this.data.notification.imageUrl || '',
        phone: this.data.notification.phone || '',
        service: this.data.notification.service || '',
        status: this.data.notification.status || '',
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadFile(file).subscribe({
        next: (response) => {
          this.notificationForm.patchValue({ imageUrl: response.filePath });
        },
        error: (err) => {
          this.snackBar.open('Erro ao fazer upload da imagem.', 'Fechar', {
            duration: 3000,
          });
          console.error('Erro ao fazer upload da imagem:', err);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      const formValues = this.notificationForm.value;

      const notificationData: UpdateNotification = {
        name: formValues.name || this.data.notification.name,
        endereco: formValues.endereco || this.data.notification.endereco,
        imageUrl: formValues.imageUrl || this.data.notification.imageUrl,
        phone: formValues.phone || this.data.notification.phone,
        status: formValues.status || this.data.notification.status,
        id: 0,
        message: '',
        createdAt: '',
        updatedAt: '',
        service: formValues.service || this.data.notification.service,
      };

      this.pedidoService
        .updateNotification(this.notificationId, notificationData)
        .subscribe(
          (response) => {
            this.snackBar.open('Pedido atualizado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          (error) => {
            this.snackBar.open(
              'Erro ao atualizar o pedido. Tente novamente.',
              'Fechar',
              { duration: 3000 }
            );
            console.error('Erro ao atualizar o pedido:', error);
          }
        );
    } else {
      this.snackBar.open(
        'Por favor, preencha todos os campos obrigatórios.',
        'Fechar',
        { duration: 3000 }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
