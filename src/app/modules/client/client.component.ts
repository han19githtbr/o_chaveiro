import { Menu } from '../shared/models/menu.model';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ActivatedRoute, Data, Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import BreadCrumbComponent from '../shared/components/bread-crumb/bread-crumb.component';
import MenuSideNavComponent from '../shared/components/menu-side-nav/menu-side-nav.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';


const angularModules = [CommonModule, RouterModule];
const components = [
  BreadCrumbComponent,
  MenuSideNavComponent,
  ToolbarComponent,
];

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [...angularModules, ...components, MaterialModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export default class ClientComponent implements OnInit {

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public menus: Menu[] = [
    {
      label: 'Pedidos',
      icon: 'notifications',
      router: 'pedidos',
    },
    {
      label: 'Chaveiros disponiveis',
      icon: 'person_outline',
      router: 'chaveiro',
    },

  ];

  public isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public title!: string;
  public subtitle!: string;


  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);


  constructor(private breakpointObserver: BreakpointObserver) {}

  public ngOnInit(): void {
    this.setTitles();
    this.subscribeRouterEvents();

    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) =>
        this.isMobile$.next(state.matches)
      );

  }

  private subscribeRouterEvents(): void {
    this.router.events.subscribe(() => this.setTitles());
  }

  private setTitles(): void {
    this.title = this.breadCrumbData?.['breadcrumb'];
    this.subtitle = this.breadCrumbData?.['description'];
  }

  private get breadCrumbData(): Data | undefined {
    return (
      this.activatedRoute?.firstChild?.firstChild?.snapshot.data ||
      this.activatedRoute?.firstChild?.snapshot.data
    );
  }

}
