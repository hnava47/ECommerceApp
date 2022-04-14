import { gql } from '@apollo/client';

export const USER_ORDERS = gql`
query orders{
    orders {
        _id
        purchaseDate
        orderQuantity
        product {
            name
            unitPrice
            
        }
        
    }
}
`