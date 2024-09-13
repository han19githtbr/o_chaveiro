export interface Permission {
  id: number;
  title: string;
}

export interface UserAdminResponse {
  result: {
    page: number;
    total: number;
    registros: UserAdmin[];
  };
}

export interface UserAdmin {
  id: number;
  name: string;
  email: string;
  status: string;
  role: 'User' | 'Admin';
  imageUrl: string;
  permissions: Permission[];
}
