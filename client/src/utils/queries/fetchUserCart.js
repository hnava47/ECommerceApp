import { gql } from '@apollo/client';

export const USER_CART = gql`
    query cart {
        cart {
            _id
            products {
                name
                unitPrice
            }
            username
        }
    }
`;
