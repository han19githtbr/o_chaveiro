export interface CreateRegisterDto {
  role?: 'admin' | 'user';
  name: string;
  email: string;
  password: string;
  //status: 'ativo' | 'inativo';
  imageUrl?: string;
  phone: string;
}

export interface UserDetailsDto {
  id: number;
  role: string;
}

export interface RegisterDto {
  id: number;
  phone: string;
  email: string;
  name: string;
  imageUrl: string | null;
  role: 'admin' | 'user';
  //status: 'ativo' | 'inativo';
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateRegisterDto {
  id: number;
  role?: 'admin' | 'user';
  name?: string;
  email?: string;
  password?: string;
  //status?: 'ativo' | 'inativo';
  imageUrl?: string;
  phone?: string;
}
