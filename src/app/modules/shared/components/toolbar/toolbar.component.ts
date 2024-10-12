import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StorageService } from 'src/app/modules/core/auth/storage.service';
import { UserAdmin } from '../../models/userAdmin';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from 'src/app/modules/gerencial/components/settings/settings.service';
import  AdminModalComponent from 'src/app/modules/gerencial/components/admin-modal/admin-modal.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  admin: UserAdmin | undefined;

  //admin: UserAdmin | null = null;

  @Input() public useEdit!: boolean;

  constructor(
    private storageService: StorageService,
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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


  openAdminModal(): void {
    if (this.admin) {
      const dialogRef = this.dialog.open(AdminModalComponent, {
        data: { admin: this.admin },
        panelClass: 'custom-dialog-container',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Recarregue os dados da empresa após a edição, se necessário
          this.ngOnInit();
        }
      });
    }
  }


  /*public goToDetails(admin: any): void {
    this.router.navigate(['../admin-modal', admin.id], { relativeTo: this.route });
  }*/

}
