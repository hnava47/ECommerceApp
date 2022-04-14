import { gql } from '@apollo/client';

export const UPDATE_CART = gql`
    mutation updateCart($id: ID!, $orderQuantity: Int!) {
        updateCart(id: $id, orderQuantity: $orderQuantity) {
        _id
        orderQuantity
        productId
        }
    }
`;
