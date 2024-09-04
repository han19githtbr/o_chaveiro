import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideImageControllerService {
  public image$: BehaviorSubject<string> = new BehaviorSubject<string>('assets/images/login-1.png');

  private images: string[] = [
    'assets/images/key_banner_1.jpg',
    'assets/images/keys_logo_2.png',
    'assets/images/keys_2.jpg'
  ]

  constructor() {
    this.startImageRotation();
  }

  private startImageRotation(): void {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      this.setImage(this.images[randomIndex]);
    }, 3000);
  }

  public setImage(imageSource: string = 'assets/images/key_banner_1.jpg'): void {
    Promise.resolve().then(() => {this.image$.next(imageSource)});
  }
}
