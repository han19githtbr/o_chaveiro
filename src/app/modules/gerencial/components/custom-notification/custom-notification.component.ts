import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-notification',
  standalone: true,  // Transformando em componente standalone
  imports: [CommonModule],  // Importando módulos necessários
  templateUrl: './custom-notification.component.html',
  styleUrls: ['./custom-notification.component.scss']
})
export class CustomNotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}

