export interface Cliente {
  id?: number;
  status: 'servido' | 'andando' | 'pendente' | 'cancelado' ;
  name?: string;
  service: string;
  endereco?: string;
  imageUrl?: string;
  phone?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCliente {
  id?: number;
  status: 'servido' | 'andando' | 'pendente' | 'cancelado' ;
  name?: string;
  service: string;
  endereco?: string;
  imageUrl?: string;
  phone?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateCliente {
  id?: number;
  status: 'servido' | 'andando' | 'pendente' | 'cancelado' ;
  name?: string;
  service: string;
  endereco?: string;
  imageUrl?: string;
  phone?: number;
  createdAt?: string;
  updatedAt?: string;
}
