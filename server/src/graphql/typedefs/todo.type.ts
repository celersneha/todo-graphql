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

#input type definitions
input CreateTodoInput {
    title: String!
    description: String
    userId: ID!
}


input UpdateTodoInput {
    id: ID!
    title: String
    description: String
    completed: Boolean
    userId: ID!
}

type Query {
    getAllTodos(userId: ID!): [Todo!]!
    getTodoById(id: ID!): Todo!
}

type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Boolean!
    toggleTodoCompletion(id: ID!): Todo!
}


`;
