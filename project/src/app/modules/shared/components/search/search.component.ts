import { CommonModule } from '@angular/common';
import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import ButtonComponent from '../button/button.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ButtonComponent
  ]
})
export class SearchComponent {

  @Input() public useButton!: boolean;
  @Input() public useOptions!: boolean;
  @Input() public option!: any[];
  @Input() public buttonLabel!: string;
  @Input() public routerLinkAction!: string;
  @Input() public textSearch!: string;
  @Output() public textSearchChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() public filterClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() public fullSearch: boolean = false;
  @Output() public clickButtonEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public search(): void {
    this.textSearchChange.emit(this.textSearch);
  }

  public onFilterClick(): void {
    this.filterClick.emit();
  }

}
