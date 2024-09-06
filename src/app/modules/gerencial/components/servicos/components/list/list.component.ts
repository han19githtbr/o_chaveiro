import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayColumns } from 'src/app/modules/shared/components/list-table/models/display-columns.model';
import { ActivatedRoute, Router } from '@angular/router';
import ListTableComponent from 'src/app/modules/shared/components/list-table/list-table.component';
import { ServicosService } from '../../servicos.service';
import { Service } from 'src/app/modules/shared/models/service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ListTableComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export default class ListComponent implements OnInit{
  services: Service[] = [];
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  public users: any[] = [];
  public headers: DisplayColumns[] = [
    { key: 'cliente', text: 'Nome Cliente' },
    { key: 'service', text: 'Serviço' },
    { key: 'value', text: 'Preço' },
    { key: 'status', text: 'Status' },
  ];

  constructor(private service: ServicosService) {}


  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices() {
    this.service.getAllServices().subscribe(
      (services: Service[]) => {
        this.services = services;
      },
      (error) => {
        console.error('Erro ao carregar os serviços:', error);
      }
    );
  }


  public goToDetails(user: any): void {
    this.router.navigate(['../details', user.id], { relativeTo: this.route });
  }
}
