import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayColumns } from 'src/app/modules/shared/components/list-table/models/display-columns.model';
import { ActivatedRoute, Router } from '@angular/router';
import ListTableComponent from 'src/app/modules/shared/components/list-table/list-table.component';
import { ChaveiroService } from '../../chaveiros.service';
import { Chaveiro } from 'src/app/modules/shared/models/chaveiro';


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
  public chaveiros: Chaveiro[] = [];
  public users: any[] = [];
  public headers: DisplayColumns[] = [
    { key: 'name', text: 'Nome' },
    { key: 'phone', text: 'Telefone' },
    { key: 'endereco', text: 'Endereço' },
    { key: 'status', text: 'Status' },
  ];

  constructor(private chaveiroService: ChaveiroService) {
    this.loadChaveiros();
  }


  private loadChaveiros() {
    this.chaveiroService.getAllChaveiros().subscribe(
      (chaveiros: Chaveiro[]) => {
        this.chaveiros = chaveiros;
      },
      (error) => {
        console.error('Erro ao carregar os chaveiros:', error);
      }
    );
  }

  public goToDetails(user: any): void {
    this.router.navigate(['../details', user.id], { relativeTo: this.route });
  }
}
