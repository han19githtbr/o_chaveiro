export interface Chaveiro {
  id?: number;
  name: string;
  endereco:string;
  imageUrl?: string;
  status: 'disponivel' | 'indisponivel';
  phone: number;
  createdAt?: string;
  updatedAt?: string;
}
