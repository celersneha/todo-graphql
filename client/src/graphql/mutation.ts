import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: SignupInput!) {
    createUser(input: $input) {
      success
      message
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      success
      message
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
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

export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
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

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
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

export const TOGGLE_TODO_COMPLETION = gql`
  mutation ToggleTodoCompletion($id: ID!) {
    toggleTodoCompletion(id: $id) {
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
