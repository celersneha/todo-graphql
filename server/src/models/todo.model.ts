import mongoose, { Schema, Document, Model } from "mongoose";

// Define a TypeScript interface for the User document
export interface ITodo extends Document {
  title: string;
  description: string; // Optional field
  completed: boolean; // Default to false
  userId: string; // Reference to the user who created the todo
  createdAt?: Date; // Automatically added by Mongoose's timestamps
  updatedAt?: Date; // Automatically added by Mongoose's timestamps
}

// Define the Mongoose schema
const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true, // Index for faster search
      min: [3, "Title must be at least 3 characters long"],
      max: [100, "Title must not exceed 100 characters"], // Optional length validation
    },
    description: {
      type: String,
      required: false,
      trim: true,
      max: [500, "Description must not exceed 500 characters"], // Optional length validation
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Ensure that every todo is associated with a user
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Compound index for username and email
todoSchema.index({ username: 1, email: 1 }, { unique: true });

// Export the Mongoose model
export const Todo: Model<ITodo> =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema);
