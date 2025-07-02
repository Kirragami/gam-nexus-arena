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

// Game Types
export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  imageUrl?: string;
  category: string;
  platform: string[];
  releaseDate: string;
  isActive: boolean;
  screenshots?: string[];
  systemRequirements?: SystemRequirements;
  createdAt: string;
  updatedAt?: string;
}

export interface SystemRequirements {
  minimum: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  recommended: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export interface GameFilters {
  category?: string;
  platform?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export interface GamesResponse {
  items: Game[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// GraphQL Query types for games
export interface GetGamesQuery {
  games: GamesResponse;
}

export interface GetGamesVariables {
  limit?: number;
  offset?: number;
  search?: string;
  filters?: GameFilters;
}

export interface GetGameQuery {
  game: Game;
}

export interface GetGameVariables {
  id: string;
}
