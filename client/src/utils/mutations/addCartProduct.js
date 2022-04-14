import { gql } from '@apollo/client';

export const ADD_CART = gql`
    mutation addCart($productId: ID!) {
        addCart(productId: $productId) {
        _id
        orderQuantity
        productId
        }
    }
`;
