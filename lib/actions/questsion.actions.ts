"use server";

import Question from "@/database/question-model";
import Tag from "@/database/tag-schema";
import { connectDB } from "../mongoose";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
} from "./types";
import User from "@/database/user-schema";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectDB();

    const { title, content, tags, path, author } = params;
    // console.log(params);

    const question = await Question.create({
      title,
      content,
      author: JSON.parse(author),
    });

    const tagDocument = [];

    for (const tag of tags) {
      const exitingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        {
          $setOnInsert: { name: tag },
          $push: {
            questions: question._id,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      tagDocument.push(exitingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: { $each: tagDocument },
      },
    });

    //  increase user record and reputation

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function GetQuestions(params: GetQuestionsParams) {
  try {
    connectDB();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetQuestionById(params: GetQuestionByIdParams) {
  try {
    connectDB();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return {question};
  } catch (error) {
    console.log(error);
    throw error;
  }
}
