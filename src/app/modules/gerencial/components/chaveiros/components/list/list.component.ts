import { Component, inject, Input } from '@angular/core';
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
  @Input() searchText: string = '';

  public chaveiros: Chaveiro[] = [];
  public users: any[] = [];
  public filteredChaveiros: Chaveiro[] = [];
  public headers: DisplayColumns[] = [
    { key: 'name', text: 'Nome' },
    { key: 'phone', text: 'Telefone' },
    { key: 'endereco', text: 'Endereço' },
    { key: 'status', text: 'Status' },
  ];

  public checkCustomColors: {[key: string]: string} = {
    'Ativo': '#D7E9D0',
    'Inativo': '#e8c5c5',
  }

  constructor(private chaveiroService: ChaveiroService) {
    this.loadChaveiros();
  }

  ngOnChanges() {
    this.filterChaveiros(this.searchText);
  }

  private loadChaveiros() {
    this.chaveiroService.getAllChaveiros().subscribe(
      (chaveiros: Chaveiro[]) => {
        this.chaveiros = chaveiros;
        this.filteredChaveiros = chaveiros;
      },
      (error) => {
        console.error('Erro ao carregar os chaveiros:', error);
      }
    );
  }


  public filterChaveiros(searchText: string): void {
    this.filteredChaveiros = this.chaveiros.filter(chaveiro =>
      chaveiro.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }


  public goToDetails(chaveiro: any): void {
    this.router.navigate(['../details', chaveiro.id], { relativeTo: this.route });
  }
}
