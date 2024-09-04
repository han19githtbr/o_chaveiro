export interface Service {
  id?: number;
  cliente: string;
  //service: string;
  service: 'copia' | 'conserto';
  value: number;
  imageUrl: string;
  status: 'pronto' | 'andando';
  pedidoDate: string;
  createdAt?: string;
  updatedAt?: string;
}
