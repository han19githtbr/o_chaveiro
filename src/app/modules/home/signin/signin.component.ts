import { MaterialModule } from 'src/app/material.module';
import { AfterContentInit, Component, DestroyRef, inject } from '@angular/core';
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

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export default class SigninComponent implements AfterContentInit {

  private readonly destroy: DestroyRef = inject(DestroyRef);
  public image$!: Observable<string>;

  public signinForm: FormGroup = new FormGroup({
    credential: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
  ) {}

  public hide: boolean = true;
  public router: Router = inject(Router);

  public sideImageService: SideImageControllerService = inject(
    SideImageControllerService
  );

  public ngAfterContentInit(): void {
    this.image$ = this.sideImageService.image$.pipe(
      takeUntilDestroyed(this.destroy)
    );
    this.sideImageService.setImage();
  }

  public submit(): void {
    if (this.signinForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', '', { duration: 3000 });
      return;
    }

    const signin: SigninCredentials = this.signinForm.value as SigninCredentials;
    console.log('Enviando credenciais:', signin);

    this.authService.loginAsAdmin(signin).subscribe({
    next: (auth) => {
      this.storageService.saveToken(auth.token);
      if (auth.account.role === 'admin') {
        this.router.navigate(['gerencial/dashboard']);
        this.snackBar.open('Logado com sucesso.', '', { duration: 3000 });
      } else {
        this.router.navigate(['cliente/dashboard']);
        this.snackBar.open('Logado com sucesso.', '', { duration: 3000 });
      }
      /*this.authService.fetchUserData(auth.account.id).subscribe((user: UpdateRegisterDto )=> {
        this.storageService.saveUserDetails(user);

        this.snackBar.open('Logado com sucesso.', '', { duration: 3000 });
      },(err) => this.snackBar.open(err.error.error, '', { duration: 2000 }));*/
      },
      error: (err) => this.snackBar.open(err.error.error, '', { duration: 2000 })
    });
  }
}
