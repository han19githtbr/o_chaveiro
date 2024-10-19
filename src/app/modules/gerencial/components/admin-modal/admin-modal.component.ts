/*import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../settings/settings.service';
import EditAdminModalComponent from 'src/app/modules/shared/components/toolbar/edit-admin-modal/edit-admin-modal.component';
import { StorageService } from 'src/app/modules/core/auth/storage.service';


@Component({
  selector: 'app-cliente-modal-notification',
  template: `
    <div class="modal-overlay">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="card-section">
          <div class="row items-center">
            <ng-container>
              <mat-icon class="edit_button" (click)="openEditModal()">edit</mat-icon>
            </ng-container>

            <ng-container>
              <mat-icon>delete_outline</mat-icon>
            </ng-container>
          </div>
        </div>

        <h2>Detalhes do Administrador</h2>
        <div class="detail-item">
          <!--<mat-icon>image</mat-icon>-->
          <!--<span>Foto:</span>-->
          <img [src]="admin?.imageUrl" alt="Foto do Administrador" class="admin-image"/>
        </div>
        <div class="detail-item">
          <mat-icon>person</mat-icon>
          <span>Nome:</span>
          <span class="name">{{ admin?.name }}</span>
        </div>

        <div class="detail-item">
          <mat-icon>email</mat-icon>
          <span>Email:</span>
          <span class="email">{{ admin?.email }}</span>
        </div>
        <div class="detail-item">
          <mat-icon>check_circle</mat-icon>
          <span>Status:</span>
          <span class="status">{{ admin?.status }}</span>
        </div>

        <button mat-button (click)="closeModal()" class="close-button">Fechar</button>
      </div>
    </div>
  `,
  styles: [`

    .row {
      padding-bottom: 20px;
    }

    .edit_button:hover {
      color: #0000ff;
      cursor: pointer;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: rgb(225, 223, 223);
      padding: 20px;
      border-radius: 8px;
      max-width: 90%;
      max-height: 90%;
      overflow-y: auto;
      position: relative;
    }

    .detail-item {
      display: flex;
      align-items: center;
      margin: 10px 0;
      font-size: 16px;
      width: 100%;
    }

    .detail-item mat-icon {
      margin-right: 8px;
      color: #0000ff;
    }

    .name {
      font-weight: bold;
      margin-left: 10px;
    }

    .email {
      font-weight: bold;
      margin-left: 10px;
    }

    .status {
      font-weight: bold;
      margin-left: 10px;
    }

    .admin-image {
      width: 300px;
      height: 250px;
      max-width: 300px;
      max-height: 200px;
      margin-left: 8px;
      border-radius: 2%;
    }

    .close-button {
      margin-top: 20px;
      background-color: #ff0000;
      width: 100%;
      border-radius: 4px;
      border: 3px solid black;
      color: black;
      font-size: 17px;
      font-weight: bold;
    }

    .close-button:hover {
      background-color: #ff8a8a;
      cursor: pointer;
    }
  `],
  standalone: true,
  imports: [
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    CommonModule
  ],

})

export default class AdminModalComponent {
  @Input() admin: any;
  @Input() public useToggle!: boolean;
  @Input() public useEdit!: boolean;
  @Input() public useDelete!: boolean;
  @Output() close = new EventEmitter<void>();


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminModalComponent>,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}


  ngOnInit(): void {

    const adminId = 1; // Você deve substituir por onde está obtendo o ID real.
    console.log(`Buscando detalhes para o administrador com ID: ${adminId}`);
    this.storageService.getAdminDetails(adminId).subscribe({
      next: (admin) => {
        console.log('Detalhes do administrador:', admin);
        this.admin = admin;
      },
      error: (error) => {
        console.error('Erro ao buscar detalhes do administrador:', error);
      },
    });
  }


  openEditModal(): void {
    if (this.admin) {
      const dialogRef = this.dialog.open(EditAdminModalComponent, {
        data: { admin: this.admin },
        panelClass: 'custom-dialog-container',
        disableClose: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Recarregue os dados da empresa após a edição, se necessário
          this.ngOnInit();
        }
      });
    }
  }


  closeModal(): void {
    this.dialogRef.close();
  }
}*/
