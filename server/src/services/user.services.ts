import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { User } from "../models/user.model";
import mongoose from "mongoose";

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface CreateTokenPayload {
  id: string;
  username: string;
  email: string;
}

class UserService {
  private static async encryptPassword(password: string) {
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
  }

  private static generateToken(payload: CreateTokenPayload) {
    const { id, username, email } = payload;

    const token = jwt.sign(
      { id, username, email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRATION } as SignOptions
    );
    return token;
  }

  private static async verifyPassword(
    password: string,
    hashedPassword: string
  ) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  // registering a new user
  public static async createUser(payload: CreateUserPayload) {
    const { username, email, password } = payload;
    if (!username || !email || !password) {
      return {
        success: false,
        message: "All fields are required",
        token: null,
        user: null,
      };
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return {
          success: false,
          message: "User already exists",
          token: null,
          user: null,
        };
      }

      const encryptedPassword = await this.encryptPassword(password);

      const user = await User.create({
        username,
        email,
        password: encryptedPassword,
      });

      const token = this.generateToken({
        id: (user._id as mongoose.Types.ObjectId).toString(),
        email: user.email,
        username: user.username,
      });

      if (!token) {
        return {
          success: false,
          message: "Error generating token",
          token: null,
          user: null,
        };
      }

      return {
        success: true,
        message: "User created successfully",
        token,
        user,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while creating the user";
      return {
        success: false,
        message: errorMessage,
        token: null,
        user: null,
      };
    }
  }

  // logging in a user
  public static async loginUser(payload: LoginUserPayload) {
    const { email, password } = payload;
    if (!email || !password) {
      return {
        success: false,
        message: "All fields are required",
        token: null,
        user: null,
      };
    }

    try {
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        return {
          success: false,
          message: "User not found",
          token: null,
          user: null,
        };
      }

      const isPasswordValid = this.verifyPassword(password, user.password);

      if (!isPasswordValid) {
        return {
          success: false,
          message: "Invalid password",
          token: null,
          user: null,
        };
      }

      const token = this.generateToken({
        id: (user._id as mongoose.Types.ObjectId).toString(),
        email: user.email,
        username: user.username,
      });

      if (!token) {
        return {
          success: false,
          message: "Error generating token",
          token: null,
          user: null,
        };
      }

      return {
        success: true,
        message: "Login successful",
        token,
        user,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while logging in the user";
      return {
        success: false,
        message: errorMessage,
        token: null,
        user: null,
      };
    }
  }

  // Get user by ID
  public static async getUserById(userId: string) {
    try {
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return {
          success: false,
          message: "User not found",
          user: null,
        };
      }
      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while fetching the user";
      return {
        success: false,
        message: errorMessage,
        token: null,
        user: null,
      };
    }
  }
}

export default UserService;
