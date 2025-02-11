import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TypeFile } from 'src/app/modules/shared/enums/type-file.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { Service } from 'src/app/modules/shared/models/service';
import { DashboardService } from '../dashboard/dashboard.service';
import FileUploaderComponent from 'src/app/modules/shared/components/file-uploader/file-uploader.component';
import { FileUploadService } from 'src/app/modules/shared/components/file-uploader/file-upload.service';

@Component({
  selector: 'app-cliente-form',
  template: `
    <h4 class="info-client" mat-dialog-title>Informações do Cliente</h4>
    <div mat-dialog-content class="dialog-content">
      <form [formGroup]="clienteForm">
        <mat-form-field appearance="outline" class="custom-form-field">
          <mat-icon matPrefix>person</mat-icon>
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="custom-form-field">
          <mat-icon matPrefix>location_on</mat-icon>
          <mat-label>Endereço</mat-label>
          <input matInput formControlName="endereco" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="custom-form-field">
          <mat-icon matPrefix>image</mat-icon>
          <mat-label>Link da foto da chave</mat-label>
          <input matInput formControlName="imageUrl" />
        </mat-form-field>

        <!--<mat-form-field appearance="outline" class="custom-form-field">
          <mat-icon matPrefix>image</mat-icon>
          <mat-label>Foto da chave</mat-label>
          <input matInput formControlName="imageUrl" [value]="clienteForm.get('imageUrl')?.value" readonly />
        </mat-form-field>

        <app-file-uploader
          [textDescription]="'Carregue a foto'"
          [fileLength]="1"
          [typeFile]="TypeFile.Imagem"
          (fileChange)="onFileChange($event)"
        ></app-file-uploader>-->

        <mat-form-field appearance="outline" class="custom-form-field">
          <mat-icon matPrefix>phone</mat-icon>
          <mat-label>Telefone</mat-label>
          <input matInput formControlName="phone" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="custom-form-field">
          <mat-icon matPrefix>key</mat-icon>
          <mat-label>Serviço selecionado</mat-label>
          <input matInput formControlName="service" />
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions class="dialog-actions">
      <button mat-button (click)="onCancel()" class="cancel-button">
        Cancelar
      </button>
      <button mat-button (click)="onSave()" class="save-button">Salvar</button>
    </div>
    <div *ngIf="isLoading" class="loading">
      <span>Carregando</span>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    FileUploaderComponent,
    MatInputModule,
    MatIconModule,
  ],
  styles: [
    `
      .info-client {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;
      }

      .dialog-content {
        display: flex;
        margin-left: 10px;
        margin-right: 10px;
        flex-direction: column;
        //gap: -5px;
      }

      .custom-form-field {
        width: 100%;
        height: 75px;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: -5px;
      }

      .cancel-button,
      .save-button {
        font-weight: bold;
        margin-left: 8px;
      }

      .cancel-button {
        background-color: #fbfbfb;
        border: 3px solid black;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 200px;
      }

      .cancel-button:hover {
        border: 1px solid black;
      }

      .save-button {
        background-color: #4d4dff;
        width: 200px;
        border: 3px solid black;
        margin-right: 10px;
        margin-bottom: 10px;
      }

      .save-button:hover {
        border: 1px solid black;
      }

      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 10px;
        color: #0000ff;
      }

      .loading span {
        font-weight: bold;
        margin-left: 12px;
      }

      .dot {
        width: 8px;
        height: 8px;
        background-color: #00ffff;
        border-radius: 50%;
        animation: blink 1.1s infinite both;
        margin: 0 4px;
      }

      .dot:nth-child(2) {
        background-color: #0000ff;
        animation-delay: 0.2s;
      }

      .dot:nth-child(3) {
        background-color: #ff0080;
        animation-delay: 0.4s;
      }

      @keyframes blink {
        0%,
        80%,
        100% {
          opacity: 0;
        }
        40% {
          opacity: 1;
        }
      }
    `,
  ],
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  @Input() selectedServices: Service[] = [];

  TypeFile = TypeFile;

  clienteForm: FormGroup;
  isLoading = false;

  services: Service[] = [];

  constructor(
    public dialogRef: MatDialogRef<ClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private dashboardService: DashboardService,
    private fileUploaderService: FileUploadService,
    private dialog: MatDialog
  ) {
    this.clienteForm = this.fb.group({
      name: ['', Validators.required],
      endereco: ['', Validators.required],
      phone: ['', Validators.required],
      imageUrl: [''],
      service: ['', Validators.required],
    });

    if (data && data.selectedServices) {
      this.selectedServices = data.selectedServices;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    /*this.form = this.fb.group({
      imageUrl: [''],
    });*/
    this.loadServices();
  }

  openFileUploader(): void {
    const dialogRef = this.dialog.open(FileUploaderComponent, {
      width: '420px',
      height: '170px',
    });

    dialogRef.afterClosed().subscribe((result: string | null) => {
      if (result) {
        this.clienteForm.get('imageUrl')?.setValue(result);
        this.clienteForm.get('imageUrl')?.markAsDirty();
        this.clienteForm.get('imageUrl')?.updateValueAndValidity();
      }
    });
  }

  onFileChange(event: File[]): void {
    if (event && event.length > 0) {
      const file = event[0];

      this.fileUploaderService.uploadFile(file).subscribe(
        (response) => {
          const imageUrl = response.url; // Usar a URL gerada pelo backend
          this.clienteForm.get('imageUrl')?.setValue(imageUrl); // Atualizar o campo com a URL completa
          console.log('URL da Imagem:', imageUrl);
        },
        (error) => {
          console.error('Erro ao fazer o upload da imagem:', error);
        }
      );
    }
  }

  private loadServices() {
    this.dashboardService.getAllServices().subscribe(
      (services: Service[]) => {
        this.services = this.getUniqueServices(services);
      },
      (error) => {
        console.error('Erro ao carregar os serviços:', error);
      }
    );
  }

  private getUniqueServices(services: Service[]): Service[] {
    const uniqueServicesMap = new Map<string, Service>();

    services.forEach((service) => {
      if (!uniqueServicesMap.has(service.service)) {
        uniqueServicesMap.set(service.service, service);
      }
    });

    return Array.from(uniqueServicesMap.values());
  }

  onSave() {
    if (this.clienteForm.valid) {
      this.isLoading = true;

      const { name, endereco, phone, imageUrl, service } =
        this.clienteForm.value;

      const notification = {
        //message: `Novo cliente: ${name}, ${endereco}, ${phone}, ${imageUrl}, Serviços: ${selectedServicesText}`,
        message: `Novo cliente: ${name}, ${endereco}, ${phone}, ${imageUrl}, Serviços: ${service}`,
        status: 'novo',
        name,
        endereco,
        phone,
        imageUrl,
        service,
        //service: selectedServicesText,
      };

      console.log('Notificação Criada:', notification);

      this.notificationService.createNotification(notification).subscribe({
        next: (response) => {
          // Simula um tempo de espera para exibir o "Carregando..."
          setTimeout(() => {
            this.isLoading = false;
            this.dialogRef.close(this.data); // Fecha o diálogo com os dados passados

            // Exibe notificações após fechar o diálogo
            this.notificationService
              .sendNotification('Novo cliente salvo!')
              .subscribe();
            this.notificationService.showNotification(
              'Novo cliente salvo!',
              'Ver detalhes',
              this.data
            );
          }, 3000); // Aguarda 3 segundos antes de fechar o diálogo e mostrar as notificações
        },
        error: (err) => {
          console.error('Erro ao criar cliente:', err);
          this.isLoading = false; // Interrompe o carregamento em caso de erro
        },
      });
    } else {
      console.error('Formulário inválido');
    }
  }
}
