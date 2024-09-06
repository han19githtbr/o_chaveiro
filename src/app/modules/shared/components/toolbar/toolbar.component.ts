import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StorageService } from 'src/app/modules/core/auth/storage.service';
import { UserAdmin } from '../../models/userAdmin';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  //admin: UserAdmin | null = null;
  admin: UserAdmin | undefined;

  constructor(private storageService: StorageService) {}


  ngOnInit(): void {
    this.loadAdmin();
    /*this.admin = this.storageService.getAdminDetails() as UserAdmin;
    console.log(this.admin);*/
  }


  getAdminIdFromLocalStorage(): number | null {
    const storedAdmin = localStorage.getItem('ADMIN_ID');
    return storedAdmin ? +storedAdmin : null;
  }

  loadAdmin() {
    const adminIdFromRoute = this.route.snapshot.paramMap.get('id');
    let adminId: number | null = adminIdFromRoute ? +adminIdFromRoute : null;

    if (!adminId || adminId <= 0) {
      // Se o ID da rota não estiver presente ou inválido, recupere do localStorage
      adminId = this.getAdminIdFromLocalStorage();
    }

    if (adminId && adminId > 0) { // Verifica se o ID é um número válido e maior que 0
      this.storageService.getAdminDetails(adminId).subscribe(
        (response) => {
          this.admin = response;
          console.log('Info do administrador', this.admin);
        },
        (error) => {
          console.error('Erro ao obter detalhes do administrador:', error);
        }
      );
    } else {
      console.warn('ID do administrador inválido ou não encontrado na rota ou no armazenamento local.');
    }
  }

}
