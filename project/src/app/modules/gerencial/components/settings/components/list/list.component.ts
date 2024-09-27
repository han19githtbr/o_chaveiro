import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayColumns, TypeColumn } from 'src/app/modules/shared/components/list-table/models/display-columns.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import ListTableComponent from 'src/app/modules/shared/components/list-table/list-table.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { SettingsService } from '../../settings.service';
import { UserAdmin } from 'src/app/modules/shared/models/userAdmin';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ListTableComponent,
    MaterialModule,
    RouterModule,
    NgxSpinnerModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export default class ListComponent implements OnInit {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  public usersAdmin: UserAdmin[] = [];

  private readonly service = inject(SettingsService);
  private readonly spinner = inject(NgxSpinnerService);


  constructor(){}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.service.findAllUsers().subscribe(
      (usersAdmin) => {
        this.usersAdmin = usersAdmin.map(userAdmin => ({
          ...userAdmin,
          name: userAdmin.name,
          email: userAdmin.email,
          role: userAdmin.role,
          status: userAdmin.status
        }));
      },
      (error) => {
        console.error('Erro ao buscar administradores:', error);
      }

    )
  }


  public goToDetails(user: any): void{
    this.router.navigate(['../detalhes', user.id], { relativeTo: this.route });
  }
}
