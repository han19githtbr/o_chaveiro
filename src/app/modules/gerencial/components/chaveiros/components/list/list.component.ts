import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayColumns } from 'src/app/modules/shared/components/list-table/models/display-columns.model';
import { ActivatedRoute, Router } from '@angular/router';
import ListTableComponent from 'src/app/modules/shared/components/list-table/list-table.component';

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
  public users: any[] = [];
  public headers: DisplayColumns[] = [
    { key: 'name', text: 'Nome' },
    { key: 'signature', text: 'Ass/grupo' },
    { key: 'expiration_date', text: 'Data expi.' },
    { key: 'document', text: 'CPF' },
    { key: 'phone', text: 'Telefone' },
    { key: 'email', text: 'E-mail' },
    { key: 'status', text: 'Status' },
  ];

  constructor() {
    for (let index = 0; index < 10; index++) {
      this.users.push({
        id: index + 1,
        name: 'Nome',
        signature: 'Nome',
        expiration_date: `00/00/00`,
        document: `000.000.000-0${index + 1}`,
        phone: `(00) 00000-000${index}`,
        email: `mail-${index}@email.com`,
        status: index % 2 ? 'Desativado' : 'Ativo',
      });
    }
  }

  public goToDetails(user: any): void {
    this.router.navigate(['../details', user.id], { relativeTo: this.route });
  }
}
