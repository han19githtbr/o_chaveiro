import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Menu } from '../../models/menu.model';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-menu-side-nav',
  templateUrl: './menu-side-nav.component.html',
  styleUrls: ['./menu-side-nav.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    ToolbarComponent
  ]
})
export default class MenuSideNavComponent{
  @Input() public menusToShow: Menu[] = [];
  //@Input() public isMenuOpen: boolean = false;

  public showSubmenu = false;

  public runEvent = (menu: Menu): void => menu.event?.()
}
