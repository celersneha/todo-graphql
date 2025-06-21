import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const verifyToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    return decodedToken as any;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const getContext = async ({ req }: { req: any }) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token
    if (!token) {
      // Return empty context instead of throwing an error
      return {};
    }
    try {
      const decodedToken = verifyToken(token);
      const user = await User.findById(decodedToken.id).select("-password");
      if (user) {
        return { user };
      }
    } catch (error) {
      // Token verification failed, but we'll still proceed with empty context
      console.warn(
        "Token verification failed:",
        error instanceof Error ? error.message : String(error)
      );
    }

    return {};
  } catch (error) {
    console.error("Context error:", error);
    return {}; // Return empty context instead of throwing
  }
};
