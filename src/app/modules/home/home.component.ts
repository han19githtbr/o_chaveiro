import { Observable, startWith, map } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideImageControllerService } from '../shared/services/side-image-controller.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserAdmin } from '../shared/models/userAdmin';
import SigninComponent from './signin/signin.component';
import { ClienteFormComponent } from '../gerencial/components/cliente-form/cliente-form.component';
import { Chaveiro } from '../shared/models/chaveiro';
import { Notification } from '../shared/models/notification';
import { PedidoService } from '../gerencial/components/pedidos/pedido.service';
import { ChaveiroService } from '../gerencial/components/chaveiros/chaveiros.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatMenuModule,
    MatInputModule,
    MaterialModule,
    ClienteFormComponent,
    SigninComponent,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export default class HomeComponent implements OnInit {
  currentPhraseIndex: number = 0;
  selectedUser: UserAdmin[] = [];
  displayedText: string = 'Sua chave está na mão';
  searchText = new FormControl('');

  //searchText: string = '';
  filteredNotifications: Observable<Notification[]> | undefined;
  notifications: Notification[] = [];
  chaveiros: Chaveiro[] = [];
  chaveirosAtivos: Chaveiro[] = [];
  chaveirosInativos: Chaveiro[] = [];
  chaveirosFiltrados: Chaveiro[] = [];
  mostrarChaveiros = false;
  mostrarApenasDisponiveis = true;
  incremento = 2;
  inicioExibicao = 2;

  services: string[] = ['Cópia', 'Conserto'];
  selectedService: string | null = null;
  selectedChaveiro: Chaveiro[] = [];

  constructor(
    private sideImageService: SideImageControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private pedidoService: PedidoService,
    private chaveiroService: ChaveiroService
  ) {}

  public router: Router = inject(Router);


  ngOnInit(): void {
    this.sideImageService.setImage();

    // Carregar notificações do serviço
    this.pedidoService.getAllNotifications().subscribe((data) => {
      this.notifications = data;

      // Configurar o filtro com os dados carregados
      this.filteredNotifications = this.searchText.valueChanges.pipe(
        startWith(''),
        map((value: string | null) =>
          value && value.trim() ? this._filterNotifications(value) : []
        )
      );
    });

    this.carregarChaveiros();
  }

  private _filterNotifications(value: string): Notification[] {
    const filterValue = value.toLowerCase().trim();
    return this.notifications.filter((notification) =>
      notification.name.toLowerCase().includes(filterValue)
    );
  }

  carregarChaveiros(): void {
    this.chaveiroService.getAllChaveiros().subscribe((data) => {
      this.chaveiros = data;
      this.separarChaveiros();
      this.chaveirosFiltrados = this.chaveiros.slice(0, this.inicioExibicao); // Inicializa com todos
    });
  }

  separarChaveiros(): void {
    this.chaveirosAtivos = this.chaveiros.filter(chaveiro => chaveiro.status === 'ativo');
    this.chaveirosInativos = this.chaveiros.filter(chaveiro => chaveiro.status === 'inativo');
  }

  toggleChaveiros(): void {
    this.mostrarChaveiros = !this.mostrarChaveiros;
    if(this.mostrarChaveiros){
        this.filtrarChaveiros()
    }
  }

  filtrarChaveiros(): void {
    if(this.mostrarChaveiros){
        this.chaveirosFiltrados = this.mostrarApenasDisponiveis ? this.chaveirosAtivos.slice(0, this.inicioExibicao) : this.chaveiros.slice(0, this.inicioExibicao);
    }
  }

  exibirMais(): void {
    if(this.mostrarChaveiros){
        const listaParaExibir = this.mostrarApenasDisponiveis ? this.chaveirosAtivos : this.chaveiros;
        const proximoIndice = this.chaveirosFiltrados.length + this.incremento;
        this.chaveirosFiltrados = listaParaExibir.slice(0, proximoIndice);
    }
  }

  onSelectionChange(event: any): void {
    this.selectedUser = event.value;
  }

  onServiceChange(event: any): void {
    this.selectedService = event.value;
    this.openClienteFormModal();
  }

  openClienteFormModal(): void {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      width: '300px',
      data: {
        name: '',
        endereco: '',
        imageUrl: '',
        phone: '',
        service: this.selectedService,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dados do cliente recebidos:', result);
        // Aqui você pode adicionar lógica para enviar esses dados para o servidor ou atualizar o estado do front-end
        this.showNotification('Pedido recebido');
      }
    });
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

  showNotification(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['custom-snackbar'],
    });
  }

  onNewOrderReceived(): void {
    this.showNotification('Pedido recebido');
  }
}
