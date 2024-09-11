import { MaterialModule } from 'src/app/material.module';
import { AfterContentInit, Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SideImageControllerService } from '../../shared/services/side-image-controller.service';
import ButtonComponent from '../../shared/components/button/button.component';
import { SigninCredentials } from '../../shared/models/signin';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../core/auth/storage.service';
import { UpdateRegisterDto } from '../../shared/models/register.dto';
import { MatRadioChange } from '@angular/material/radio';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingEffectComponent } from "../../shared/components/loading-effect/loading-effect.component";
import HomeComponent from '../home.component';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonComponent,
    HomeComponent,
    LoadingEffectComponent
],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export default class SigninComponent implements AfterContentInit {


  isFormDisabled(): boolean {
    return this.selectedRole === 'User';
  }

  @Input() selectedRole: 'User' | 'Admin' | undefined;

  private readonly destroy: DestroyRef = inject(DestroyRef);
  public image$!: Observable<string>;

  public signinForm: FormGroup = new FormGroup({
    credential: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,

  ) {}

  public hide: boolean = true;
  public router: Router = inject(Router);

  /*public sideImageService: SideImageControllerService = inject(
    SideImageControllerService
  );*/

  public ngAfterContentInit(): void {
    /*this.image$ = this.sideImageService.image$.pipe(
      takeUntilDestroyed(this.destroy)
    );
    this.sideImageService.setImage();*/
    if (this.selectedRole === 'User') {
      this.signinForm.disable();
    } else {
      this.signinForm.enable();
    }
  }


  public submit(): void {
    if (this.signinForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', '', { duration: 3000 });
      return;
    }

    this.loadingService.showLoading();

    const signin : SigninCredentials = this.signinForm.value as SigninCredentials;

    this.authService.login(signin).subscribe({
      next: (auth) => {
        this.storageService.saveToken(auth.token)

        const delay = Math.random() * (5000 - 1000) + 1000;

        setTimeout(() => {
          this.loadingService.hideLoading();
          this.router.navigate(['gerencial/dashboard']);
          this.snackBar.open('Logado com sucesso.', '', { duration: 3000 });
        }, delay);
      },
      error: (err) => {
        this.loadingService.hideLoading();
        this.snackBar.open(err.error.error, '', { duration: 2000 });
      }
    });
  }


  /*isFormDisabled(): boolean {
    return this.signinForm.invalid;
  }*/
}
