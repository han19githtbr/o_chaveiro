export interface Service {
  id?: number;
  cliente: string;
  service: 'copia' | 'conserto';
  value: number;
  imageUrl: string;
  status: 'pronto' | 'andando';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateService {
  id?: number;
  cliente: string;
  service: 'copia' | 'conserto';
  value: number;
  imageUrl: string;
  status: 'pronto' | 'andando';
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateService {
  id?: number;
  cliente: string;
  service: 'copia' | 'conserto';
  value: number;
  imageUrl: string;
  status: 'pronto' | 'andando';
  createdAt?: string;
  updatedAt?: string;
}
