import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.DATABASE_URL) {
    return console.log("DATABASE_URL missing");
  }

  if (isConnected) {
    return console.log("DB already connected");
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "DevOverflow",
    });

    isConnected = true;

    console.log("DB connected");
  } catch (error) {
    console.log("can not connect to DB");
    throw new Error("can not connect to DB");
  }
};
