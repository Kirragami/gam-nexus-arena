
// GraphQL Types based on your schema

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  roles: Role[];
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface UserRegistrationInput {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginInput {
  usernameOrEmail: string;
  password: string;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR'
}

// GraphQL Query and Mutation types
export interface LoginMutation {
  login: AuthResponse;
}

export interface RegisterMutation {
  registerUser: User;
}

export interface RefreshTokenMutation {
  refreshToken: AuthResponse;
}

export interface LogoutMutation {
  logout: boolean;
}

export interface MeQuery {
  me: User;
}

export interface UserQuery {
  user: User;
}
