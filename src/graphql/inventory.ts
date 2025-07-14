
import { gql } from '@apollo/client';

export const GET_INVENTORY = gql`
  query GetInventory($userId: String!) {
    getInventory(userId: $userId) {
      id
      title
      description
      price
      rating
      imageUrl
      category
      platforms
      releaseDate
      isActive
      createdAt
    }
  }
`;

export const OWNS_GAME = gql`
  query OwnsGame($userId: String!, $gameId: String!) {
    ownsGame(userId: $userId, gameId: $gameId)
  }
`;
