import { AfterContentInit, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SideImageControllerService } from '../../shared/services/side-image-controller.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import ButtonComponent from '../../shared/components/button/button.component';
import { AuthService } from '../signin/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingEffectComponent } from "../../shared/components/loading-effect/loading-effect.component";


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    LoadingEffectComponent,
    ButtonComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export default class ForgotPasswordComponent implements AfterContentInit {
  public image$!: Observable<string>
  public forgotForm: FormGroup = new FormGroup({});
  public errorMessage: string = '';
  public successMessage: string = '';

  private readonly destroy: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private sideImageService: SideImageControllerService = inject(SideImageControllerService);
  private authService: AuthService = inject(AuthService);


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public ngAfterContentInit(): void {
    this.image$ = this.sideImageService.image$.pipe(takeUntilDestroyed(this.destroy));
    this.sideImageService.setImage('assets/images/keys_logo_2.png');
  }



  public forgotPassword(): void {

    this.loadingService.showLoading();

    if (this.forgotForm.valid) {
      this.authService.forgotPassword({ credential: this.forgotForm.value.email }).subscribe(
        (response) => {
          const delay = Math.random() * (5000 - 1000) + 1000;

          setTimeout(() => {
            this.successMessage = response.message;
            this.errorMessage = '';
            this.loadingService.hideLoading();
            this.router.navigate(['../reset'], { relativeTo: this.route });
            this.snackBar.open('O código foi enviado para o seu email.', '', { duration: 3000 });
            return;
          }, delay);
        },
        (error) => {
          this.loadingService.hideLoading();
          this.errorMessage = error.error.message || 'Erro durante a recuperação de senha.';
          this.successMessage = '';
        }
      )
    }
  }
}
