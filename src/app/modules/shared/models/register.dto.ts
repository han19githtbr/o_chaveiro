export interface CreateRegisterDto {
  role: 'admin' | 'user';
  type: "app";
  name: string;
  email: string;
  password: string;
  status: 'ativo' | 'inativo' | 'pendente';
  imageUrl?: string;
  birthday: string;
  creci: number;
  cpf: string;
  permissions: Permission[];
  phone: string;
}

export interface Permission {
  id: number;
  title: string;
}

export interface UserDetailsDto {
  id: number;
  role: string;
}

export interface RegisterDto {
  id: number;
  birthday: string;
  cpf: string;
  type: string;
  phone: string;
  email: string;
  name: string;
  creci: number;
  imageUrl: string | null;
  role: string;
  status: string;
  code: number;
  permissions: Permission[];
  codeExpiresIn: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface UpdateRegisterDto {
  id: number;
  role?: 'admin' | 'user';
  type: "app";
  name: string;
  email: string;
  password: string;
  status: 'ativo' | 'inativo' | 'pendente';
  imageUrl?: string;
  birthday: string;
  creci: number;
  cpf: string;
  phone: string;
}
