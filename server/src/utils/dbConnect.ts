import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI as string
    );
    console.log(
      `Connected to MongoDB at host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Connection error: ", error);
    process.exit(1);
  }
};

export default dbConnect;
