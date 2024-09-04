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

  phrases: string[] = [
    "Melhores preços do mercado",
    "Aqui você encontra a chave que procura",
    "Entregamos um serviço de qualidade",
    "Rapidez e eficiência garantidas",
    "A chave perfeita para você"
  ]

  displayedText: string = "Faça a sua chave conosco";
  currentPhraseIndex: number = 0;

  constructor(
    private sideImageService: SideImageControllerService
  ) { }

  ngOnInit(): void {
    this.sideImageService.setImage();
    this.startTextRotation();
  }

  startTextRotation() {
    setInterval(() => {
      this.displayTypingEffect(this.phrases[this.currentPhraseIndex]);
      this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
    }, 5000);
  }

  displayTypingEffect(text: string) {
    let index = 0;
    this.displayedText = '';

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        this.displayedText += text.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
  }
}
