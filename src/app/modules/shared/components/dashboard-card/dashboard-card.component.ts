import { Component, Input } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export default class DashboardCardComponent { 
  @Input() number!: string;
  @Input() icon!: string;
  @Input() iconContainerColor: string = "#000";
  @Input() description!: string;
}
