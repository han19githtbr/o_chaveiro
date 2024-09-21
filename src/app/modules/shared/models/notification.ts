export interface Notification {
  id: number;
  message: string;
  name: string;
  phone: string;
  endereco: string;
  imageUrl: string;
  //imageUrl: Image[];
  status: 'novo' | 'pendente' | 'ativo' | 'inativo';
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
  status: 'novo' | 'pendente' | 'ativo' | 'inativo';
  createdAt: string;
  updatedAt: string;
  service: string;
}




