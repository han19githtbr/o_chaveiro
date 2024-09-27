export interface Service {
  id?: number;
  cliente: string;
  service: string
  value: number;
  imageUrl: string;
  //status: 'pronto' | 'pendente';
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateService {
  id?: number;
  cliente: string;
  service: string;
  value: number;
  imageUrl: string;
  //status: 'pronto' | 'pendente';
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateService {
  id?: number;
  cliente: string;
  service: string;
  value: number;
  imageUrl: string;
  //status: 'pronto' | 'pendente';
  status: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface UpdateService extends CreateService {
  id?: number;
}
