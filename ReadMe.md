# ✨ TickTask

![Alt Text](/client/public/Hero-Section.png)

A sleek, modern full-stack todo application powered by GraphQL, React, TypeScript, and MongoDB. Todo-GraphQL features an intuitive interface with a beautiful blue-purple gradient theme, providing an elegant experience for managing your daily tasks.

## 🌟 Features

- **🔐 User Authentication:** Secure signup and login system with JWT
- **📝 Task Management:** Create, view, update, and delete tasks seamlessly
- **🔍 Smart Filtering:** Easily filter tasks by completion status
- **📱 Fully Responsive:** Optimized for both desktop and mobile devices
- **⚡ Live Updates:** Instant data synchronization with GraphQL
- **🎨 Elegant UI:** Clean, accessible interface with consistent styling
- **🔔 Notifications:** Receive feedback on successful actions

## 🚀 Tech Stack

### Frontend

- **React 18+:** Modern component-based UI library
- **TypeScript:** Enhanced code quality and developer experience
- **Apollo Client:** Powerful GraphQL client for state management
- **Styled Components:** Component-scoped styling solution
- **React Router:** Seamless navigation between views
- **React Hook Form:** Efficient form validation and handling
- **Feather Icons:** Beautiful and minimal icon set

### Backend

- **Node.js:** Fast and scalable JavaScript runtime
- **Express:** Lightweight web framework
- **Apollo Server:** Feature-rich GraphQL server
- **MongoDB:** Flexible NoSQL database
- **Mongoose:** Elegant MongoDB object modeling
- **JWT Authentication:** Secure token-based auth system
- **TypeScript:** Type safety throughout the codebase

## 🛠️ Getting Started

### Prerequisites

- Bun (v1.0+)
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/SnehaSharma245/Todo-GraphQL.git
   cd Todo-GraphQL/backend
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file with the following variables:

   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=7d
   ```

4. Start the server:

   ```bash
   bun dev
   ```

   The GraphQL API will be available at `http://localhost:8000/graphql`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file:

   ```env
   VITE_API_URL=http://localhost:8000/graphql
   ```

4. Start the client:

   ```bash
   bun run dev
   ```

   The application will be available at `http://localhost:5173`

## 📊 API Overview

### GraphQL Endpoints

The API provides the following operations:

#### Queries

- `currentUser`: Get the currently authenticated user
- `todos`: Get all todos for the current user
- `todo(id: ID!)`: Get a specific todo by ID

#### Mutations

- `signUp(input: SignUpInput!)`: Register a new user
- `signIn(input: SignInInput!)`: Authenticate a user
- `createTodo(input: TodoInput!)`: Create a new todo
- `updateTodo(id: ID!, input: TodoInput!)`: Update an existing todo
- `deleteTodo(id: ID!)`: Remove a todo
- `toggleCompleted(id: ID!)`: Toggle completion status

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication flow
- Protected GraphQL resolvers
- Input validation and sanitization
- CORS protection


## 🤝 Contributing

We welcome all contributions to enhance TickTask! Follow these simple steps to contribute:

1. **Fork the Repository**: Create a copy of the repo on your GitHub.
2. **Create a Branch**: Work on a new feature or fix in an isolated branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit Changes**: Make sure to write clear and descriptive commit messages:
   ```bash
   git commit -m "Add your feature description"
   ```
4. **Push Changes**: Push the changes to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Submit a Pull Request**: Open a PR to merge your changes into the main repo.

We’re excited to collaborate and grow TickTask with your help! 😊


## 🙏 Acknowledgements

- GraphQL Foundation
- Apollo GraphQL Documentation
- React Documentation
- MongoDB Documentation
- Bun Documentation

## 👤 Author

**Sneha Sharma**

- GitHub: [@SnehaSharma245](https://github.com/SnehaSharma245)
- LinkedIn: [Sneha Sharma](https://linkedin.com/in/snehasharma245)
- Email: snehav2109@gmail.com
