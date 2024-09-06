export interface Cliente {
  id?: number;
  name?: string;
  endereco?:string;
  imageUrl?: string;
  phone?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCliente {
  id?: number;
  name?: string;
  endereco?:string;
  imageUrl?: string;
  phone?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateCliente {
  id?: number;
  name?: string;
  endereco?:string;
  imageUrl?: string;
  phone?: number;
  createdAt?: string;
  updatedAt?: string;
}
