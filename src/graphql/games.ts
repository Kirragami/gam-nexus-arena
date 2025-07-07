
import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query GetGames($limit: Int, $offset: Int, $search: String, $filters: GameFilters) {
    games(limit: $limit, offset: $offset, search: $search, filters: $filters) {
      items {
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
      totalCount
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const GET_GAME_BY_ID = gql`
  query GetGameById($id: ID!) {
    game(id: $id) {
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
      screenshots
      systemRequirements
      createdAt
    }
  }
`;
