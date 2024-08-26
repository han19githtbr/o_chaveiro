import { CommonModule, Location } from '@angular/common';
import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import ButtonComponent from '../button/button.component';

@Component({
  selector: 'app-form-actions',
  templateUrl: './form-actions.component.html',
  styleUrls: ['./form-actions.component.scss'],
  imports: [CommonModule, ButtonComponent],
  standalone: true
})
export default class FormActionsComponent {
  location = inject(Location)

  @Input() tooltipTextInvalid: string = '';
  @Input() showSaveButton: boolean = true;
  @Output() clickSaveEvent: EventEmitter<any> = new EventEmitter<any>();
  

  public back(): void{
    this.location.back();
  }
}
