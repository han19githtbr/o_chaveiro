import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cliente-form',
  template: `
    <h4 class="info-client" mat-dialog-title>Informações do Cliente</h4>
    <div mat-dialog-content class="dialog-content">
      <mat-form-field appearance="fill" class="custom-form-field">
        <mat-icon matPrefix>person</mat-icon>
        <mat-label>Nome</mat-label>
        <input matInput [(ngModel)]="data.name" />
      </mat-form-field>

      <mat-form-field appearance="fill" class="custom-form-field">
        <mat-icon matPrefix>location_on</mat-icon>
        <mat-label>Endereço</mat-label>
        <input matInput [(ngModel)]="data.endereco" />
      </mat-form-field>

      <mat-form-field appearance="fill" class="custom-form-field">
        <mat-icon matPrefix>image</mat-icon>
        <mat-label>URL da Foto</mat-label>
        <input matInput [(ngModel)]="data.imageUrl" />
      </mat-form-field>

      <mat-form-field appearance="fill" class="custom-form-field">
        <mat-icon matPrefix>phone</mat-icon>
        <mat-label>Telefone</mat-label>
        <input matInput [(ngModel)]="data.phone" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions class="dialog-actions">
      <button mat-button (click)="onCancel()" class="cancel-button">Cancelar</button>
      <button mat-button (click)="onSave()" class="save-button">Salvar</button>
    </div>
    <div *ngIf="isLoading" class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <span>Carregando...</span>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  styles: [
    `
      .info-client {
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 10px;
        margin-right: 10px;
      }
      .dialog-content {
        display: flex;
        margin-left: 10px;
        margin-right: 10px;
        flex-direction: column;
        gap: 16px;
      }

      .custom-form-field {
        width: 100%;
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }

      .cancel-button, .save-button {
        font-weight: bold;
        margin-left: 8px;
      }

      .cancel-button {
        background-color: #e30000;
        border: 1px solid black;
        margin-bottom: 10px;
      }

      .save-button {
        background-color: #3f51b5;
        color: white;
        width: 100px;
        border: 1px solid black;
        margin-right: 8px;
        margin-bottom: 10px;
      }

      .save-button:hover {
        background-color: #303f9f;
      }

      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 10px;
        color: #0000ff;
      }

      .dot {
        width: 10px;
        height: 10px;
        background-color: #3f51b5;
        border-radius: 50%;
        animation: blink 1.4s infinite both;
        margin: 0 4px;
      }

      .dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes blink {
        0%, 80%, 100% {
          opacity: 0;
        }
        40% {
          opacity: 1;
        }
      }
    `
  ]
})

export class ClienteFormComponent {
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.dialogRef.close(this.data);
    }, 3000);
  }
}
