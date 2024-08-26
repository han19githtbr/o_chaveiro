export interface SigninCredentials {
  credential: string;
  password: string;
}


export interface User {
  id?: number;
  role: 'user' | 'admin';
  type: 'app' | 'web';
  cnpj_cpf: string;
  nome_representante_1 :string;
  email: string;
  password: string;
  birthday: string;
  telefone_celular: string;
  creci: string;
  status_prospeccao:string;
  imageUrl: string;
  code: string;
  codeExpiresIn: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface Auth {
  token: string;
  user: User;
}
