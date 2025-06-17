export const userTypeDefs = `#graphql

# User Type Definitions
type User {  _id: ID!
  username: String! 
  email: String!
  createdAt: String
  updatedAt: String
}

# Auth Response Type Definitions
type AuthResponse {
    success: Boolean!
    message: String
    token: String
    user: User
}

# signup input type

input SignupInput {
  username: String!
  email: String!
  password: String!
}

input LoginInput {
  email: String!
  password: String!
}

type Query{
#required for authentication
    getUser: User
}

type Mutation {
createUser(input: SignupInput!): AuthResponse!
loginUser(input: LoginInput!): AuthResponse!
}
`;
