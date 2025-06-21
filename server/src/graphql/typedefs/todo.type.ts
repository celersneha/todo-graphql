export const todoTypeDefs = `#graphql

#Todo Type Definitions
type Todo {
    _id: ID!
    title: String!
    description: String
    completed: Boolean!
    userId: ID!
    createdAt: String!
    updatedAt: String!
}

#Response Types
type TodoResponse {
    success: Boolean!
    message: String!
    todo: Todo
}

type TodosResponse {
    success: Boolean!
    message: String!
    todos: [Todo!]
    
}

#input type definitions
input CreateTodoInput {
    title: String!
    description: String
   
}


input UpdateTodoInput {
    id: ID!
    title: String
    description: String
    completed: Boolean
  
}

type Query {
    getAllTodos: TodosResponse!
    getTodoById(id: ID!): TodoResponse!
}

type Mutation {
    createTodo(input: CreateTodoInput!): TodoResponse!
    updateTodo(input: UpdateTodoInput!): TodoResponse!
    deleteTodo(id: ID!): TodoResponse!
    toggleTodoCompletion(id: ID!): TodoResponse!
}


`;
