import mongoose, { Schema, Document, Model } from "mongoose";

// Define a TypeScript interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt?: Date; // Automatically added by Mongoose's timestamps
  updatedAt?: Date; // Automatically added by Mongoose's timestamps
}

// Define the Mongoose schema
const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
      match: /^[a-zA-Z0-9_]{3,30}$/, // Regex for username validation
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex for email validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Hide password from output
      trim: true,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, // Regex for password validation (at least one uppercase, one lowercase, and one digit)
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Compound index for username and email
userSchema.index({ username: 1, email: 1 }, { unique: true });

// Export the Mongoose model
export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
