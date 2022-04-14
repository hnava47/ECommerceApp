import { gql } from '@apollo/client';

export const ALL_CATEGORIES = gql`
    query categories {
        categories {
            name
        }
    }
`;
