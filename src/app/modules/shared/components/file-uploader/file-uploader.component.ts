import { ImagePreviewComponent } from './image-preview/image-preview.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreviewFiles } from '../../models/preview-files.model';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { TypeFile } from '../../enums/type-file.enum';
import { FileUploadService } from './file-upload.service';



@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export default class FileUploaderComponent implements OnInit {
  @Input() public textDescription!: string;
  @Input() public typeFile!: TypeFile;
  @Input() public fileLength!: number;
  @Input() public filesModel!: any[];

  @Output() public fileChange: EventEmitter<any> = new EventEmitter<any>();

  public previewFiles!: PreviewFiles[];

  constructor(
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.previewFiles = [];
    if(this.filesModel?.filter((file: any) => file)?.length){
      if(this.typeFile === TypeFile.Imagem) this.mapPreviewFiles('Imagem');
      if(this.typeFile === TypeFile.Pdf) this.mapPreviewFiles('Documento');
    }
  }


  private mapPreviewFiles(suffix: string): void{
    this.previewFiles = this.filesModel?.map((file: any) => {
      return {
        source: file,
        name: `${suffix} - ${file}`
      }
    });
  }


  public addImage(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files![0];

    if (file) {
      this.fileUploadService.uploadFile(file).subscribe(
        (response) => {
          this.previewFiles.push({
            name: file.name,
            source: response.url, // Supondo que a resposta do upload inclua a URL
            file: file,
          });
          this.fileChange.emit(this.previewFiles);
        },
        (error) => {
          this.openSnackbar('Erro ao fazer upload do arquivo.');
        }
      );
    }
  }

  public previewImage(previewFile: PreviewFiles): void{
    this.dialog.open(ImagePreviewComponent, {
      data: previewFile?.source,
    });
  }


  public deleteImage(previewFile: PreviewFiles): void{
    const index: number = this.previewFiles.indexOf(previewFile);

    if (index !== -1) {
      this.previewFiles.splice(index, 1);
    }

    this.fileChange.emit(this.previewFiles);
  }

  public openSnackbar(message: string): void{
    this.snackbar.open(message, '', {
      duration: 3000
    })
  }
}

