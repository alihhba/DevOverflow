"use server";

import Answer from "@/database/answer-model";
import Question from "@/database/question-model";
import Tag from "@/database/tag-schema";
import User from "@/database/user-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./types";

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

export async function GetUserInfo(params: any) {
  try {
    connectDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      console.log("user not found");
    }

    const questionCount = await Question.countDocuments({ author: user._id });
    const answerCount = await Answer.countDocuments({ author: user._id });

    return {
      user,
      questionCount,
      answerCount,
    };
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

    // const userQuestionsId = await Question.find({ auth: user._id }).distinct(
    //   "_id"
    // );

    await Question.deleteMany({ author: user._id });

    const deleteUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetAllUsers(params: GetAllUsersParams) {
  try {
    connectDB();

    const users = await User.find({}).sort({ joinedAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function AddQuestionToCollection(
  params: ToggleSaveQuestionParams
) {
  try {
    connectDB();

    const { path, questionId, userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      redirect("/sign-in");
      throw new Error("user not found");
    }

    if (user.saved.includes(questionId)) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { saved: questionId },
        },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetSavedQuestion(params: GetSavedQuestionsParams) {
  try {
    connectDB();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        {
          path: "author",
          model: User,
          select: "_id name picture clerkId",
        },
      ],
    });

    if (!user) {
      throw new Error("user not found");
    }

    return { questions: user };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetUserTopQuestions(params: GetUserStatsParams) {
  try {
    connectDB();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      console.log("user not found");
      throw new Error("user not found");
    }

    const questionsCount = await Question.countDocuments({ author: user.id });

    const questions = await Question.find({ author: user.id })
      .sort({
        views: -1,
        upVotes: -1,
      })
      .populate("author", "_id picture clerkId name")
      .populate("tags", "_id name");

    return { questionsCount, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetUserAnswers(params: GetUserStatsParams) {
  try {
    connectDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      console.log("user not found");
      throw new Error("user not found");
    }

    const answersCount = await Answer.countDocuments({ author: user.id });

    const answers = await Answer.find({ author: user.id })
      .sort({ upVotes: -1 })
      .populate("author", "_id name clerkId picture")
      .populate({
        path: "question",
        select: "-content",
        model: Question,
        populate: [
          { path: "tags", model: Tag, select: "_id name" },
          { path: "author", model: User, select: "name _id clerkId picture" },
        ],
      });

    return { answers, answersCount };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
