import { ClienteFormComponent } from './../cliente-form/cliente-form.component';
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import DashboardCardComponent from 'src/app/modules/shared/components/dashboard-card/dashboard-card.component';
import { CardSectionComponent } from 'src/app/modules/shared/components/card-section/card-section.component';
import { MaterialModule } from 'src/app/material.module';
import { DashboardService } from './dashboard.service';
import { SearchComponent } from 'src/app/modules/shared/components/search/search.component';
//import ClienteToastComponent from '../cliente-toast/cliente-toast.component';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Chaveiro } from 'src/app/modules/shared/models/chaveiro';
import { Service } from 'src/app/modules/shared/models/service';
//import { ClienteModalComponent } from '../cliente-modal/cliente-modal.component';
import { ClienteModalNotificationComponent } from '../cliente-modal-notification/cliente-modal-notification.component';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { ChatService } from 'src/app/modules/shared/services/chat.service';
import NotificationToastComponent from '../notification-toast/notification-toast.component';
import ListComponent from '../chaveiros/components/list/list.component';
import { NewNotification } from 'src/app/modules/shared/models/notification';

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
    ListComponent,
    //ClienteToastComponent,
    ClienteModalNotificationComponent,
    //ClienteModalComponent,
    NotificationToastComponent,
    ClienteFormComponent,
    SearchComponent,
    MaterialModule,
  ],
})
export default class DashboardComponent implements OnDestroy {
  public totalChaveiros: number = 0;
  public totalRecebido: number = 0;
  public totalClientes: number = 0;
  public totalNotifications: number = 0;

  public clientesToasts: any[] = [];
  filteredClientesToasts: any[] = [];

  public notificationToasts: any[] = [];
  filteredNotificationToasts: any[] = [];

  selectedCliente: any = null;
  isModalOpen: boolean = false;
  public chaveiros: any[] = [];
  public clientes: any[] = [];

  public searchText: string = '';

  selectedServices: Service[] = [];

  notifications: Array<{
    message: string;
    data?: any;
    status: string;
    loading: boolean;
  }> = [];
  private socket: Socket;
  newMessageNotification: boolean = false;
  isChatOpen: boolean = false;

  newNotifications: NewNotification[] = [];

  page: number = 0;
  size: number = 10;

  services: Service[] = [];
  private subscription: Subscription | undefined;

  constructor(
    private dashboardService: DashboardService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private chatService: ChatService
  ) {
    this.chatService.onNewMessage(() => {
      this.newMessageNotification = true;
    });
    this.socket = io(environment.api);
  }

  ngOnInit() {
    this.loadChaveiros();
    this.updateTotalClientes();
    this.showRandomNotification();
    this.loadNewNotifications();
    this.updateTotalNotifications();
    this.listenToNotificationUpdates();
    this.showRandomCliente();
    this.loadServices();

    this.socket.on('newMessage', () => {
      this.newMessageNotification = true;
    });
  }

  // Função de busca que abre o modal se o cliente for encontrado
  onSearchChange(searchValue: string): void {
    this.searchText = searchValue;
  }

  private listenToNotificationUpdates() {
    this.subscription = this.notificationService
      .getNotifications()
      .subscribe((notification: string | { message: string; data?: any }) => {
        console.log('Notificação Recebida:', notification);

        if (typeof notification === 'string') {
          this.notifications.push({
            message: notification,
            status: 'novo',
            loading: false,
          });
          this.notificationService.showNotification(
            notification,
            'Ver detalhes',
            null
          );
        } else if (notification && notification.data) {
          const fullData = {
            message: notification.message || '',
            status: 'novo',
            loading: false,
            name: notification.data.name || '',
            endereco: notification.data.endereco || '',
            phone: notification.data.phone || '',
            imageUrl: notification.data.imageUrl || '',
            //service: notification.data.service || '',
            service: Array.isArray(notification.data.service)
              ? notification.data.service
              : [notification.data.service || ''],
          };

          this.notifications.push(fullData);
          this.notificationService.showNotification(
            fullData.message,
            'Ver detalhes',
            fullData
          );
        }
      });
  }

  ngOnDestroy() {
    this.notificationService.disconnect();
  }

  // Método para atualizar o status da notificação
  public updateNotificationStatus(index: number, newStatus: string) {
    const notification = this.notifications[index];

    // Marca o estado de loading para mostrar o efeito de carregamento
    notification.loading = true;

    // Simula o tempo de carregamento aleatório
    const randomTime = Math.floor(Math.random() * 5000) + 1000;
    setTimeout(() => {
      notification.status = newStatus;
      notification.loading = false;
    }, randomTime);
  }

  public loadNewNotifications() {
    this.notificationService.getAllNotifications().subscribe(
      (newNotifications: NewNotification[]) => {
        this.totalNotifications = newNotifications.length;
      },
      (error) => {
        console.error('Erro ao carregar o total de pedidos:', error);
      }
    );
  }

  // Acrescentei essa nova função
  private updateTotalNotifications() {
    this.notificationService.getNotifications().subscribe((notifications) => {
      if (Array.isArray(notifications)) {
        // Se as notificações são recebidas como um array
        this.totalNotifications = notifications.length;
      } else {
        // Caso contrário, trataremos como um objeto singular ou string (se for possível)
        this.totalNotifications = notifications ? 1 : 0;
      }
    });
  }

  private showRandomNotification() {
    setInterval(() => {
      // Gera um ID aleatório para buscar uma notificação (ajuste conforme necessário)
      const randomId = Number(this.generateRandomId());
      this.notificationService
        .fetchNotificationById(randomId)
        .subscribe((notification) => {
          this.notificationToasts.push(notification);
          setTimeout(() => {
            this.notificationToasts = this.notificationToasts.filter(
              (c) => c !== notification
            );
          }, 12000);
        });
    }, 6000);
  }

  // Função auxiliar para gerar um ID aleatório (ajuste conforme necessário)
  private generateRandomId(): string {
    const min = 1;
    const max = 40;
    const randomId = Math.floor(
      Math.random() * (max - min + 1) + min
    ).toString();
    return randomId;
  }

  openOrderDetailsModal(data: any) {
    const modalData = {
      ...data,
      service: data?.service,
      selectedServices: this.selectedServices,
    };

    this.dialog.open(ClienteModalNotificationComponent, {
      width: '400px',
      data: modalData,
    });
  }

  notifyNewOrder(orderData: any) {
    this.notificationService.showNotification(
      'Novo pedido',
      'Ver detalhes',
      orderData
    );
  }

  simulateNewOrder() {
    const exampleOrderData = {
      name: 'João Silva',
      endereco: 'Rua ABC, 123',
      imageUrl: 'https://example.com/photo.jpg',
      phone: '912345678',
      service: 'Cópia',
    };

    this.notifyNewOrder(exampleOrderData);
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

  private getUniqueServices(services: Service[]): Service[] {
    const uniqueServicesMap = new Map<string, Service>();

    services.forEach((service) => {
      if (!uniqueServicesMap.has(service.service)) {
        uniqueServicesMap.set(service.service, service);
      }
    });

    return Array.from(uniqueServicesMap.values());
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
    this.dashboardService.getTotalClientes().subscribe((data) => {
      this.totalClientes = data.total;
    });
  }

  private showRandomCliente() {
    setInterval(() => {
      this.dashboardService.getRandomCliente().subscribe((cliente) => {
        this.clientesToasts.push(cliente);
        setTimeout(() => {
          this.clientesToasts = this.clientesToasts.filter(
            (c) => c !== cliente
          );
        }, 10000);
        this.updateTotalClientes();
      });
    }, 10000);
  }

  onFilterClick(): void {
    const foundCliente = this.clientes.find(
      (cliente) => cliente.name.toLowerCase() === this.searchText.toLowerCase()
    );

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
    return `Serviços oferecidos`;
  }

  onSelectionChange(event: any): void {
    this.selectedServices = event.value;
    this.updateTotalRecebido();
  }

  private updateTotalRecebido() {
    this.totalRecebido = this.selectedServices.reduce(
      (total, service) => total + service.value,
      0
    );
  }

  public formatNumber(value: number): string {
    return value !== undefined ? value.toLocaleString('pt-BR') : '0';
  }
}
