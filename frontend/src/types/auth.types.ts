export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null; // ← NOVO CAMPO
  role: 'ADMIN' | 'PROJECT_MANAGER' | 'DEVELOPER' | 'VIEWER';
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  name: string;
  password: string;
  avatar?: File; // ← NOVO CAMPO
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  message: string;
}
