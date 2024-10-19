import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-loading-effect',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './loading-effect.component.html',
  styleUrls: ['./loading-effect.component.scss']
})
export class LoadingEffectComponent {
  isLoading: boolean = false;


  constructor(public loadingService: LoadingService) {}

  ngOnInit() {
    
    this.loadingService.loading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }
}
