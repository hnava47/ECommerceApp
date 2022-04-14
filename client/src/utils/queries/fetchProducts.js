import { gql } from '@apollo/client';

export const ALL_PRODUCTS = gql`
    query product {
        products {
            _id
            name
            unitPrice
            description
            image
            categoryId {
                name
            }
        }
    }
`;
