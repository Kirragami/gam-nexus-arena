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
  platforms: string[];
  releaseDate: string;
  isActive: boolean;
  screenshots?: string[];
  systemRequirements?: string;
  developer: string,
  publisher: string,
  tags: string[],
  createdAt: string;
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

// Wishlist Types
export interface WishlistItem {
  id: string;
  userId: string;
  gameId: string;
}

export interface GetWishlistQuery {
  getWishlist: WishlistItem[];
}

export interface GetWishlistVariables {
  userId: string;
}

export interface IsInWishlistQuery {
  isInWishlist: boolean;
}

export interface IsInWishlistVariables {
  userId: string;
  gameId: string;
}

export interface AddToWishlistMutation {
  addToWishlist: WishlistItem;
}

export interface AddToWishlistVariables {
  userId: string;
  gameId: string;
}

export interface RemoveFromWishlistMutation {
  removeFromWishlist: boolean;
}

export interface RemoveFromWishlistVariables {
  userId: string;
  gameId: string;
}

// Payment Types
export interface PaymentInput {
  userId: string;
  gameId: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  paymentId: string;
}

export interface InitiatePaymentMutation {
  initiatePayment: PaymentResponse;
}

export interface InitiatePaymentVariables {
  input: PaymentInput;
}

export interface HealthQuery {
  health: string;
}

// Inventory Types
export interface GetInventoryQuery {
  getInventory: Game[];
}

export interface GetInventoryVariables {
  userId: string;
}

export interface OwnsGameQuery {
  ownsGame: boolean;
}

export interface OwnsGameVariables {
  userId: string;
  gameId: string;
}
