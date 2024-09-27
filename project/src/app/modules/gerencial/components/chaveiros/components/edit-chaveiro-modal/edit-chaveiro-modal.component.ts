import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ChaveiroService } from '../../chaveiros.service';
import { Chaveiro, CreateChaveiro, UpdateChaveiro } from 'src/app/modules/shared/models/chaveiro';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import FileUploaderComponent from 'src/app/modules/shared/components/file-uploader/file-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FileUploadService } from 'src/app/modules/shared/components/file-uploader/file-upload.service';


@Component({
  selector: 'app-edit-chaveiro-modal',
  templateUrl: './edit-chaveiro-modal.component.html',
  styleUrls: ['./edit-chaveiro-modal.component.scss'],
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
export class EditChaveiroModalComponent implements OnInit {
  chaveiroForm: FormGroup;
  chaveiroId!: number;
  //usersAdmin: UserAdmin | undefined;
  public hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private chaveiroService: ChaveiroService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public location: Location,
    public dialogRef: MatDialogRef<EditChaveiroModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chaveiro: Chaveiro }
  ) {
    this.chaveiroForm = this.fb.group({
      name: ['', Validators.required],
      endereco: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]],
      phone: ['', Validators.required],
      status: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    if (this.data?.chaveiro?.id) {
      this.chaveiroId = this.data.chaveiro.id;

      this.chaveiroForm.patchValue({
        name: this.data.chaveiro.name || '',
        endereco: this.data.chaveiro.endereco || '',
        imageUrl: this.data.chaveiro.imageUrl || '',
        phone: this.data.chaveiro.phone || '',
        status: this.data.chaveiro.status || ''
      });

    }
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadFile(file).subscribe({
        next: (response) => {
          this.chaveiroForm.patchValue({ imageUrl: response.filePath });
        },
        error: (err) => {
          this.snackBar.open('Erro ao fazer upload da imagem.', 'Fechar', { duration: 3000 });
          console.error('Erro ao fazer upload da imagem:', err);
        }
      });
    }
  }


  onSubmit(): void {
    if (this.chaveiroForm.valid) {
      const formValues = this.chaveiroForm.value;

      const chaveiroData: UpdateChaveiro = {
        name: formValues.name || this.data.chaveiro.name,
        endereco: formValues.endereco || this.data.chaveiro.endereco,
        imageUrl: formValues.imageUrl || this.data.chaveiro.imageUrl,
        phone: formValues.phone || this.data.chaveiro.phone,
        status: formValues.status || this.data.chaveiro.status,
      };

      this.chaveiroService.updateChaveiro(this.chaveiroId, chaveiroData).subscribe(
        (response) => {
          this.snackBar.open('Chaveiro atualizado com sucesso!', 'Fechar', { duration: 3000 });
        },
        (error) => {
          this.snackBar.open('Erro ao atualizar o chaveiro. Tente novamente.', 'Fechar', { duration: 3000 });
          console.error('Erro ao atualizar o chaveiro:', error);
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
