import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import DashboardCardComponent from 'src/app/modules/shared/components/dashboard-card/dashboard-card.component';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import { MaterialModule } from 'src/app/material.module';
import { DashboardService } from './dashboard.service';
import { SearchComponent } from 'src/app/modules/shared/components/search/search.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    DashboardCardComponent,
    CommonModule,
    CardSectionComponent,
    SearchComponent,
    MaterialModule
  ],
})
export default class DashboardComponent {
  public totalChaveiros: number = 0;
  public totalRecebido: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {

  }


  /*async ngOnInit(): Promise<void> {
    (await this.userService.getUsers()).subscribe(users => {
      this.totalUsers = users.result.total;
      this.users = users.result.registros;
      this.updateChart();
    });
    this.totalRecebido = 0;
  }*/

  public formatNumber(value: number): string {
    return value !== undefined ? value.toLocaleString('pt-BR') : '0';
  }

}
