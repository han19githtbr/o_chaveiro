import { Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SideImageControllerService } from '../shared/services/side-image-controller.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ]
})
export default class HomeComponent implements OnInit {
  public image$: Observable<string> = this.sideImageService.image$.pipe(takeUntilDestroyed());

  constructor(
    private sideImageService: SideImageControllerService
  ) { }

  ngOnInit(): void {
    this.sideImageService.setImage();
  }
}
