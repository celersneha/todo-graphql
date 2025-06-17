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
      throw new Error("No token provided");
    }
    const decodedToken = verifyToken(token);
    const user = await User.findById(decodedToken.id).select("-password");
    if (user) {
      return { user };
    } else {
      return {};
    }
  } catch (error) {
    throw new Error("Error getting context");
  }
};
