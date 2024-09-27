import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SettingsService } from '../settings/settings.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserAdmin } from 'src/app/modules/shared/models/userAdmin';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-chaveiros-admin',
  template: `

    <div class="admins-container">

      <div *ngFor="let admin of userAdmins" class="admin-card">
        <div class="row items-center" (click)="confirmDelete(admin)">
          <mat-icon>delete_outline</mat-icon>
        </div>
        <img [src]="admin.imageUrl" alt="{{ admin.name }}" class="admin-image" />
        <div class="admin-info">
          <h3>Nome:  {{ admin.name }}</h3>
          <p>Email:  {{ admin.email }}</p>
          <p>Status:  {{ admin.status }}</p>
        </div>
      </div>
    </div>

  `,
  styles: [`
    
    .admins-container {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      justify-content: center;
      padding: 20px;
      //background-color: #f5f5f5;
    }

    .admin-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 12px 16px rgba(0, 0, 0, 0.6);
      border: 1px solid black;
      padding: 20px;
      width: 340px;
      height: 380px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }

    .row {
      position: absolute;
      margin-top: -15px;
      margin-right: -300px;
      transition: transform 0.4s;
    }

    .row:hover {
      transform: scaleX(1.1);
      cursor: pointer;
    }

    .admin-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .admin-image {
      width: 100%;
      height: 240px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 15px;
      margin-top: 15px;
      //padding-top: 10px;
    }

    .admin-info {
      text-align: center;
    }

    .admin-info h3 {
      margin: 10px 0 5px 0;
      font-size: 18px;
      font-weight: bold;
      color: #000000;
    }

    .admin-info p {
      font-size: 14px;
      color: #000000;
    }

    .snackbar-success {
      background-color: #4caf50; /* Verde para sucesso */
      color: white;
    }

    .snackbar-error {
      background-color: #f44336; /* Vermelho para erro */
      color: white;
    }

    .snackbar-warning {
      background-color: #ff9800; /* Amarelo para aviso */
      color: white;
    }

    @media (max-width: 600px) {
      .admin-card {
        width: 100%;
      }

      .admins-container {
        flex-direction: column;
        align-items: center;
      }
    }
  `],
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ]
})
export default class ChaveirosAdminComponent {
  @Input() public useDelete!: boolean;
  public userAdmins: UserAdmin[] = [];

  constructor(
    private settingsService: SettingsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Carrega todos os administradores
    this.settingsService.findAllUsers().subscribe((data) => {
      this.userAdmins = data;
      console.log('lista de administradores', data);
    });
  }


  // Função para confirmar a exclusão
  public confirmDelete(admin: UserAdmin): void {
    const snackBarRef = this.snackBar.open(
      `Tem certeza que quer apagar o administrador ${admin.name}?`,
      'Confirmar',
      {
        duration: 5000, // Duração do SnackBar
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-warning'], // Classe personalizada
      }
    );

    // Listener para a ação de confirmar
    snackBarRef.onAction().subscribe(() => {
      this.deleteAdmin(admin.id);
    });
  }

  // Função para deletar o administrador
  public deleteAdmin(userId: number): void {
    this.settingsService.deleteUserById(userId).subscribe({
      next: () => {
        // Remove o admin deletado da lista local
        this.userAdmins = this.userAdmins.filter((admin) => admin.id !== userId);

        // Exibe uma mensagem de sucesso após a exclusão
        this.snackBar.open('Administrador deletado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
        });
      },
      error: (err) => {
        console.error('Erro ao deletar administrador', err);
        this.snackBar.open('Erro ao deletar o administrador', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

}
