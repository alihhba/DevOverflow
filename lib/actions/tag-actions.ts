"use server";
import User from "@/database/user-schema";
import { connectDB } from "../mongoose";
import { GetTopInteractedTagsParams } from "./types.d";

export async function GetAllUsersTag(params: GetTopInteractedTagsParams) {
  try {
    connectDB();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("user not found");
    }

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
