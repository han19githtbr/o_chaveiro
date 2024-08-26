import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import DashboardCardComponent from 'src/app/modules/shared/components/dashboard-card/dashboard-card.component';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import { MaterialModule } from 'src/app/material.module';
import { DashboardService } from './dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    DashboardCardComponent,
    CommonModule,
    CardSectionComponent,
    MaterialModule
  ],
})
export default class DashboardComponent {
  public totalUsers: number = 0;
  public totalRecebido: number = 0;

  constructor(
    private dashboardService: DashboardService,

  ) {

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
