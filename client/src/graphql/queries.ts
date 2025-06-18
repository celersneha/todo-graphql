import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      username
      email
      createdAt
    }
  }
`;

export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    getAllTodos {
      success
      message
      todos {
        _id
        title
        description
        completed
        userId
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_TODO_BY_ID = gql`
  query GetTodoById($id: ID!) {
    getTodoById(id: $id) {
      success
      message
      todo {
        _id
        title
        description
        completed
        userId
        createdAt
        updatedAt
      }
    }
  }
`;
