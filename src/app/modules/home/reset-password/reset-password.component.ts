import { AfterContentInit, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SideImageControllerService } from '../../shared/services/side-image-controller.service';
import { AuthService } from '../signin/auth.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import ButtonComponent from '../../shared/components/button/button.component';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingEffectComponent } from "../../shared/components/loading-effect/loading-effect.component";


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonComponent,
    LoadingEffectComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export default class ResetPasswordComponent implements AfterContentInit {
  public hide: boolean = true;
  public resetForm: FormGroup;
  public errorMessage: string = '';
  public successMessage: string = '';
  public image$!: Observable<string>;
  private readonly destroy: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  public sideImageService: SideImageControllerService = inject(SideImageControllerService);
  private authService: AuthService = inject(AuthService);


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {
    this.resetForm = this.fb.group({
      credential: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  public ngAfterContentInit(): void {
    this.image$ = this.sideImageService.image$.pipe(takeUntilDestroyed(this.destroy));
    this.sideImageService.setImage('assets/images/key_banner_1.jpg');
  }

  public resetPassword(): void {
    this.loadingService.showLoading();

    setTimeout(() => {
      this.loadingService.hideLoading();
      this.router.navigate(['/home/login']);
    }, 3000);
  }


  /*public resetPassword(): void {
    if (this.resetForm.valid) {
      const { credential, code, password, confirmPassword } = this.resetForm.value;

      if (password !== confirmPassword) {
        this.errorMessage = 'As senhas não coincidem.';
        return;
      }

      this.authService.resetPassword({ credential: credential, code, password, confirmPassword }).subscribe(
        (response) => {
          this.successMessage = response.message;
          this.errorMessage = '';
          this.router.navigate(['/home/login']);
          this.snackBar.open('Senha redefinida com sucesso.', '', { duration: 3000 });
          return;
        },
        (error) => {
          this.errorMessage = error.error.message || 'Erro durante a redefinição de senha.';
          this.successMessage = '';
        }
      );
    }
  }*/
}
