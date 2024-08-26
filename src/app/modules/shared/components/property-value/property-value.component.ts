import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-value',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-value.component.html',
  styleUrls: ['./property-value.component.scss']
})
export class PropertyValueComponent {
  @Input() public property!: string;
  @Input() public value: string | undefined;
  @Input() public noWrap: boolean = false;
}
