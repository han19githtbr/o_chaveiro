import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cliente-modal',
  standalone: true,
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.scss'],
})
export class ClienteModalComponent {
  @Input() cliente: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
