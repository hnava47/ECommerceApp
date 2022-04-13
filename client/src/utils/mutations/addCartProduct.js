import { gql } from '@apollo/client';

export const ADD_CART = gql`
    mutation addCart($productId: ID!, $username: String!) {
        addCart(productId: $productId, username: $username) {
        _id
        orderQuantity
        productId
        }
    }
`;
