import { gql } from '@apollo/client';

export const REMOVE_CART = gql`
    mutation removeCart($id: ID!) {
        removeCart(id: $id) {
            _id
            orderQuantity
            productId
        }
    }
`;
