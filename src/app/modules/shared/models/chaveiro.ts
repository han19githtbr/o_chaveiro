export interface Chaveiro {
  id?: number;
  name: string;
  endereco:string;
  imageUrl: string;
  status: 'ativo' | 'inativo';
  phone: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateChaveiro {
  id?: number;
  name: string;
  endereco:string;
  imageUrl: string;
  status: 'ativo' | 'inativo';
  phone: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateChaveiro {
  id?: number;
  name: string;
  endereco:string;
  imageUrl: string;
  status: 'ativo' | 'inativo';
  phone: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateChaveiro extends CreateChaveiro {
  id?: number;
}
