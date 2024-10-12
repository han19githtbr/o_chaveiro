import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayColumns } from 'src/app/modules/shared/components/list-table/models/display-columns.model';
import { ActivatedRoute, Router } from '@angular/router';
import ListTableComponent from 'src/app/modules/shared/components/list-table/list-table.component';
import { PedidoService } from '../../pedido.service';
import { Notification } from 'src/app/modules/shared/models/notification';


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
  public notifications: Notification[] = [];
  //public users: any[] = [];
  public headers: DisplayColumns[] = [
    { key: 'name', text: 'Nome' },
    { key: 'phone', text: 'Telefone' },
    { key: 'endereco', text: 'Endereço' },
    { key: 'status', text: 'Status' },
  ];

  constructor(private pedidoService: PedidoService) {
    this.loadPedidos();
  }


  private mapStatus(status: string): 'servido' | 'cancelado' | 'andando' | 'pendente' | 'novo' {
    switch (status) {
      case 'servido':
        return 'servido';
      case 'cancelado':
        return 'cancelado';
      case 'andando':
        return 'andando';
      case 'pendente':
        return 'pendente';
      case 'novo':
        return 'novo';
      default:
        throw new Error(`Status desconhecido: ${status}`);
    }
  }


  private loadPedidos() {
    this.pedidoService.getAllNotifications().subscribe(
      (pedidos: Notification[]) => {
        // Transformar o status dos pedidos antes de exibi-los
        this.notifications = pedidos.map(pedido => ({
          ...pedido,
          status: this.mapStatus(pedido.status) // Aplica a transformação
        }));
      },
      (error) => {
        console.error('Erro ao carregar os pedidos:', error);
      }
    );
  }


  public goToDetails(pedido: any): void {
    this.router.navigate(['../details', pedido.id], { relativeTo: this.route });
  }
}
