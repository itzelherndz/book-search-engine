import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me($username: String!) {
        user(username: $username) {
            _id
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;