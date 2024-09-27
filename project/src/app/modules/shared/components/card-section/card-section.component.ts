import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProjectButton } from '../../models/button.model';
import ButtonComponent from '../button/button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatSlideToggleModule, MatIconModule]
})
export class CardSectionComponent {
  @Input() public text!: string;
  @Input() buttons!: ProjectButton[];
  @Input() public useToggle!: boolean;
  @Input() public useEdit!: boolean;
  @Input() public useDelete!: boolean;
}

/*import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProjectButton } from '../../models/button.model';
import ButtonComponent from '../button/button.component';

@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent]
})
export class CardSectionComponent {
  @Input() public text!: string;
  @Input() buttons?: ProjectButton[];
}*/
