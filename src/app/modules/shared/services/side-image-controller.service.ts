import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideImageControllerService {
  public image$: BehaviorSubject<string> = new BehaviorSubject<string>('assets/images/login-1.png');

  public setImage(imageSource: string = 'assets/images/key_banner_1.jpg'): void {
    Promise.resolve().then(() => {this.image$.next(imageSource)});
  }
}
