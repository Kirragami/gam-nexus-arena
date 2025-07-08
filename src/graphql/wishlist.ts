
import { gql } from '@apollo/client';

export const GET_WISHLIST = gql`
  query GetWishlist($userId: String!) {
    getWishlist(userId: $userId) {
      id
      userId
      gameId
    }
  }
`;

export const IS_IN_WISHLIST = gql`
  query IsInWishlist($userId: String!, $gameId: String!) {
    isInWishlist(userId: $userId, gameId: $gameId)
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($userId: String!, $gameId: String!) {
    addToWishlist(userId: $userId, gameId: $gameId) {
      id
      userId
      gameId
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($userId: String!, $gameId: String!) {
    removeFromWishlist(userId: $userId, gameId: $gameId)
  }
`;
