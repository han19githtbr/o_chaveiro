import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormActionsComponent,
    CardSectionComponent,
  ],
})
export default class AddComponent {
}
