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

  admin: UserAdmin | undefined;

  //admin: UserAdmin | null = null;

  constructor(private storageService: StorageService) {}


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

}
