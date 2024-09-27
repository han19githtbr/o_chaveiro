import { MaterialModule } from 'src/app/material.module';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export default class BreadCrumbComponent{
  @Input() public title!: string;
  @Input() public subtitle!: string;
  @Input() public showDrawerCollapse: boolean = true;

  @Output() public toggleDrawerEvent: EventEmitter<any> = new EventEmitter();
}
