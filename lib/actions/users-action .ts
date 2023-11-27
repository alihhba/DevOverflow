import { auth } from "@clerk/nextjs";
("use server");

import User from "@/database/user-schema";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./types";
import Question from "@/database/question-model";

export async function getUserById(params: any) {
  try {
    connectDB();

    const { userId } = params;

    const user = await User.findOne({
      clerkId: userId,
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectDB();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectDB();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectDB();

    const { clerkId } = params;

    const user = await User.findById({ clerkId });

    if (!user) {
      throw new Error("user not found");
    }

    const userQuestionsId = await Question.find({ auth: user._id }).distinct(
      "_id"
    );

    await Question.deleteMany({ author: user._id });

    const deleteUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
