import { gql } from '@apollo/client';

export const ALL_PRODUCTS = gql`
    query product {
        product {
            _id
            name
            unitPrice
            description
            category {
                name
            }
        }
    }
`;
