import { gql } from '@apollo/client';

export const USER_CART = gql`
    query cartCheckout {
        cartCheckout {
            totalPrice
            cart {
                _id
                productId {
                    name
                    unitPrice
                    description
                }
                orderQuantity
                orderPrice
            }
        }
    }
`;
