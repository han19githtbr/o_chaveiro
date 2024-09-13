import { Menu } from './../shared/models/menu.model';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ActivatedRoute, Data, Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatSelectModule } from '@angular/material/select';
import BreadCrumbComponent from '../shared/components/bread-crumb/bread-crumb.component';
import MenuSideNavComponent from '../shared/components/menu-side-nav/menu-side-nav.component';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


const angularModules = [CommonModule, RouterModule];
const components = [
  BreadCrumbComponent,
  MenuSideNavComponent,
  MatSelectModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  ToolbarComponent,
];


@Component({
  selector: 'app-gerencial',
  standalone: true,
  imports: [...angularModules, ...components, MaterialModule],
  templateUrl: './gerencial.component.html',
  styleUrls: ['./gerencial.component.scss'],
})
export default class GerencialComponent implements OnInit {


  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public menus: Menu[] = [
    {
      label: 'Dashboard',
      icon: 'monitoring',
      router: 'dashboard',
    },
    {
      label: 'Serviços',
      icon: 'key',
      router: 'servicos',
    },
    {
      label: 'Chaveiros',
      icon: 'person_outline',
      router: 'keys',
    },

    {
      label: 'Controle de acesso',
      icon: 'door_front',
      router: 'settings',
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
