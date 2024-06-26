import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($userId: ID!, $authors:[String], $description: String, $bookId:String!, $image:String, $title:String!) {
        saveBook(userId: $userId, authors:$authors, description:$description, bookId:$bookId, image:$image, , title:$title){
          username
          email
          savedBooks{
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

export const REMOVE_BOOK = gql`
    mutation removeBook($userId: ID!, $bookId:ID!) {
        removeBook(userId: $userId, bookId:$bookId){
          username
          email
          savedBooks{
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