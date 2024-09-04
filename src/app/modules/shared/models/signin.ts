export interface SigninCredentials {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  cpf: string;
  name:string;
  email: string;
  password: string;
  birthday: string;
  telefone: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Auth {
  token: string;
  user: User;
}
