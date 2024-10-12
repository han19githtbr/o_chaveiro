import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../../settings.service';
import FormActionsComponent from 'src/app/modules/shared/components/form-actions/form-actions.component';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import ButtonComponent from 'src/app/modules/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { Type } from 'src/app/modules/shared/models/permissions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormActionsComponent,
    ButtonComponent,
    CardSectionComponent,
    MatIconModule,
    ToastrModule,
  ],
})
export default class DetailsComponent implements OnInit {
  private readonly spinner = inject(NgxSpinnerService);
  //private readonly router = inject(ActivatedRoute);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);
  private readonly service = inject(SettingsService);
  public readonly location = inject(Location);
  public adminId!: number;
  adminForm!: FormGroup;
  public adminPermissions = new Set<number>();
  public imageUrl!: string | null;

  public hide: boolean = true;

  @Input() showSaveButton: boolean = true;
  @Output() clickSaveEvent: EventEmitter<any> = new EventEmitter<any>();

  userId = this.activatedRoute.snapshot.paramMap.get('id');

  permissions: Type[] = [];
  role: 'Admin' | 'User' = 'Admin';
  public permissoes: any[] = [
    { text: 'Dashboard' },
    { text: 'Chaveiros' },
    { text: 'Clientes' },
    { text: 'Serviços' },
    { text: 'Pedidos' },
    { text: 'Configurações' },
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createAdminForm();
    this.service.getAllPermissions().subscribe({
      next: (response) => {
        this.permissions = response;
      }
    });
  }

  public createAdminForm() {
    this.adminForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      imageUrl: [null],
      permissions: [null, [Validators.required]],
    })
  }

  public getField(field: string) {
    return this.adminForm.get(field);
  }

  public togglePermission(id: number) {
    if (this.adminPermissions.has(id)) {
      this.adminPermissions.delete(id);
    } else {
      this.adminPermissions.add(id);
    }

    this.setPermissions();
  }

  public setPermissions() {
    const ids: number[] = [];
    this.adminPermissions.forEach(item => ids.push(item));

    this.getField('permissions')?.patchValue(ids);
  }

  public onSubmit() {
    this.setPermissions();
    this.service.create(this.adminForm.value).subscribe({
      next: (response) => {
        this.snackBar.open('Administrador criado com sucesso.', '', { duration: 3000 });
        this.clickSaveEvent.emit(response);

      },
    });
  }

  findUser() {
    this.service.findById(Number(this.userId)).subscribe({
      next: (response) => {
        this.adminForm.patchValue(response);
        this.permissions = response.userHasPermissions.map((t: any) => t.permission.name);
      },
    });
  }


  createUser(user: any) {
    this.service.create(user).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.toastr.success('Usuário cadastrado com sucesso');
        this.location.back();
      },
      error: (error) =>
        this.spinner.hide().then(() => this.toastr.error(`${error.error.errors}`)),
    });
  }

  updateUser(user: any) {
    const adminUser = {
      ...user,
      permissions: this.permissions,
    };
    this.service.update(Number(this.userId), adminUser).subscribe({
      next: (response) => {
        this.spinner.hide();
        this.toastr.success('Usuário atualizado com sucesso');
        this.location.back();
      },
    });
  }


  removePermission(permission: any) {
    const matchPermission = this.permissions.findIndex((p) => p === permission);
    this.permissions.splice(matchPermission, 1);
  }

  public back(): void{
    this.location.back();
  }
}
