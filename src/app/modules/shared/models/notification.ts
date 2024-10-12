export interface Notification {
  id: number;
  message: string;
  name: string;
  phone: string;
  endereco: string;
  imageUrl: string;
  //imageUrl: Image[];
  status: 'novo' | 'pendente' | 'servido' | 'cancelado' | 'andando';
  createdAt: string;
  updatedAt: string;
  service: string;
}

export interface UpdateNotification {
  id: number;
  message: string;
  name: string;
  phone: string;
  endereco: string;
  imageUrl: string;
  //imageUrl: Image[];
  status: 'novo' | 'pendente' | 'servido' | 'cancelado' | 'andando';
  createdAt: string;
  updatedAt: string;
  service: string;
}


export interface NewNotification {
  id: number;                   // ID da notificação
  message: string;              // Mensagem completa recebida
  name: string;                 // Nome do cliente
  phone: string;                // Telefone do cliente
  endereco: string;             // Endereço do cliente
  imageUrl: string;             // URL da imagem associada
  status: 'novo' | 'pendente' | 'servido' | 'cancelado' | 'andando';
  createdAt: string;            // Data de criação da notificação
  updatedAt: string;            // Data de atualização da notificação
  service: string;             // Serviços selecionados (opcional)
}

export interface UpdateNewNotification {
  id: number;
  message: string;
  name: string;
  phone: string;
  endereco: string;
  imageUrl: string;
  status: 'novo' | 'pendente' | 'servido' | 'cancelado' | 'andando';
  createdAt: string;
  updatedAt: string;
  service: string;
}



