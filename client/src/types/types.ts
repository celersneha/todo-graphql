export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoResponse {
  success: boolean;
  message: string;
  todo?: Todo;
}
export interface TodosResponse {
  success: boolean;
  message: string;
  todos?: Todo[];
}
