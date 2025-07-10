
import { gql } from '@apollo/client';

export const INITIATE_PAYMENT = gql`
  mutation InitiatePayment($input: PaymentInput!) {
    initiatePayment(input: $input) {
      success
      message
      paymentId
    }
  }
`;

export const HEALTH_CHECK = gql`
  query Health {
    health
  }
`;
