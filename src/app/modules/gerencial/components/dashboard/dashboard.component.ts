import { ClienteFormComponent } from './../cliente-form/cliente-form.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import DashboardCardComponent from 'src/app/modules/shared/components/dashboard-card/dashboard-card.component';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import { MaterialModule } from 'src/app/material.module';
import { DashboardService } from './dashboard.service';
import { SearchComponent } from 'src/app/modules/shared/components/search/search.component';
import  ClienteToastComponent from '../cliente-toast/cliente-toast.component';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Chaveiro } from 'src/app/modules/shared/models/chaveiro';
import { Service } from 'src/app/modules/shared/models/service';
import { ClienteModalComponent } from '../cliente-modal/cliente-modal.component';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    DashboardCardComponent,
    CommonModule,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    CardSectionComponent,
    ClienteToastComponent,
    ClienteModalComponent,
    ClienteFormComponent,
    SearchComponent,
    MaterialModule
  ],
})
export default class DashboardComponent {
  public totalChaveiros: number = 0;
  public totalRecebido: number = 0;
  public totalClientes: number = 0;
  public clientesToasts: any[] = [];
  selectedCliente: any = null;
  isModalOpen: boolean = false;
  public chaveiros: any[] = [];
  public clientes: any[] = [];
  selectedServices: Service[] = [];
  searchText: string = '';
  notifications: any[] = [];

  page: number = 0;
  size: number = 10;

  services: Service[] = [];

  constructor(
    private dashboardService: DashboardService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadChaveiros();
    this.updateTotalClientes();
    this.showRandomCliente();
    this.loadServices();

    this.notificationService.notifications$.subscribe((notification) => {
      this.notifications.push(notification);
      this.showNotification(notification.message, 'Ver detalhes', notification.data);
      console.log('Notificaçao', notification)
    });
  }


  showNotification(message: string, action: string, data: any) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: undefined,
      panelClass: 'custom-snackbar'
    });

    snackBarRef.onAction().subscribe(() => {
      this.openOrderDetailsModal(data);
    });

    console.log('Dados', data);
  }


  openOrderDetailsModal(data: any) {
    this.dialog.open(ClienteModalComponent, {
      width: '400px',
      data: data
    });
  }


  private loadServices() {
    this.dashboardService.getAllServices().subscribe(
      (services: Service[]) => {
        this.services = this.getUniqueServices(services);
      },
      (error) => {
        console.error('Erro ao carregar os serviços:', error);
      }
    );
  }


  notifyNewOrder(orderData: any) {
    this.notificationService.showNotification('Novo pedido', 'Ver detalhes', orderData);
  }


  simulateNewOrder() {
    const exampleOrderData = {
      name: 'João Silva',
      endereco: 'Rua ABC, 123',
      imageUrl: 'https://example.com/photo.jpg',
      phone: '912345678',
      service: 'Cópia'
    };

    this.notifyNewOrder(exampleOrderData);
  }


  public loadChaveiros() {
    this.dashboardService.getTotalChaveiros().subscribe(
      (chaveiros: Chaveiro[]) => {
        this.totalChaveiros = chaveiros.length;
      },
      (error) => {
        console.error('Erro ao carregar o total de chaveiros:', error);
      }
    );
  }

  private updateTotalClientes() {
    this.dashboardService.getTotalClientes().subscribe(data => {
      this.totalClientes = data.total;
    });
  }


  private showRandomCliente() {
    setInterval(() => {
      this.dashboardService.getRandomCliente().subscribe(cliente => {
        this.clientesToasts.push(cliente);
        setTimeout(() => {
          this.clientesToasts = this.clientesToasts.filter(c => c !== cliente);

        }, 15000);
        this.updateTotalClientes();
      });
    }, 10000);
  }

  // Função de busca que abre o modal se o cliente for encontrado
  onSearchChange(searchText: string): void {
    this.searchText = searchText;
  }

  onFilterClick(): void {
    const foundCliente = this.clientes.find(cliente => cliente.name.toLowerCase() === this.searchText.toLowerCase());

    if (foundCliente) {
      this.selectedCliente = foundCliente;
      this.isModalOpen = true;
    } else {
      this.isModalOpen = false;
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedCliente = null;
  }

  removeCliente(index: number) {
    this.clientesToasts.splice(index, 1);
  }

  get selectedServicesText(): string {
    const count = this.selectedServices.length;
    return `Serviços oferecidos`
  }

  onSelectionChange(event: any): void {
    this.selectedServices = event.value;
    this.updateTotalRecebido();
  }

  private getUniqueServices(services: Service[]): Service[] {
    const uniqueServicesMap = new Map<string, Service>();

    services.forEach(service => {
      if (!uniqueServicesMap.has(service.service)) {
        uniqueServicesMap.set(service.service, service);
      }
    });

    return Array.from(uniqueServicesMap.values());
  }

  private updateTotalRecebido() {
    this.totalRecebido = this.selectedServices.reduce((total, service) => total + service.value, 0);
  }

  public formatNumber(value: number): string {
    return value !== undefined ? value.toLocaleString('pt-BR') : '0';
  }

}
