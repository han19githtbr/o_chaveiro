import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export default class ButtonComponent {
  @Input() public type: 'fill' | 'outline' = 'fill';
  @Output() public clickEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() public fullSize: boolean | undefined = false;
  @Input() public disabled: boolean = false;
}
