
import { gql } from '@apollo/client';

export const GET_INVENTORY = gql`
  query GetInventory($userId: String!) {
    getInventory(userId: $userId) {
      id
      userId
      gameId
    }
  }
`;

export const OWNS_GAME = gql`
  query OwnsGame($userId: String!, $gameId: String!) {
    ownsGame(userId: $userId, gameId: $gameId)
  }
`;
