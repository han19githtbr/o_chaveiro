export interface Cliente {
  id?: number;
  status: 'ativo' | 'inativo' | 'pendente';
  name?: string;
  endereco?: string;
  imageUrl?: string;
  phone?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCliente {
  id?: number;
  status: 'ativo' | 'inativo' | 'pendente';
  name?: string;
  endereco?: string;
  imageUrl?: string;
  phone?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateCliente {
  id?: number;
  status: 'ativo' | 'inativo' | 'pendente';
  name?: string;
  endereco?: string;
  imageUrl?: string;
  phone?: number;
  createdAt?: string;
  updatedAt?: string;
}
