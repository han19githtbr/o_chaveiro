import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayColumns } from 'src/app/modules/shared/components/list-table/models/display-columns.model';
import { ActivatedRoute, Router } from '@angular/router';
import ListTableComponent from 'src/app/modules/shared/components/list-table/list-table.component';
import { ClientService } from '../../client.service';
import { Cliente } from 'src/app/modules/shared/models/cliente';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ListTableComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export default class ListComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  public clientes: Cliente[] = [];
  //public users: any[] = [];
  public headers: DisplayColumns[] = [
    { key: 'name', text: 'Nome' },
    { key: 'phone', text: 'Telefone' },
    { key: 'endereco', text: 'Endereço' },
    { key: 'status', text: 'Status' },
  ];

  constructor(private clientService: ClientService) {
    this.loadClients();
  }


  private loadClients() {
    this.clientService.getAllClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      (error) => {
        console.error('Erro ao carregar os clientes:', error);
      }
    );
  }

  public goToDetails(cliente: any): void {
    this.router.navigate(['../details', cliente.id], { relativeTo: this.route });
  }
}
