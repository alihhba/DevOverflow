"use server";

import Answer from "@/database/answer-model";
import Question from "@/database/question-model";
import User from "@/database/user-schema";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./types.d";

export async function CreateAnswer(params: CreateAnswerParams) {
  try {
    connectDB();

    const { author, question, path, content } = params;

    const newAnswer = await Answer.create({
      content,
      question,
      author,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetAllAnswers(params: GetAnswersParams) {
  try {
    connectDB();

    const { questionId } = params;

    const answers = Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: User,
      })
      .sort({ createdAt: -1 });

    return answers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function UpVoteAnswer(params: AnswerVoteParams) {
  try {
    connectDB();

    const { userId, answerId, hasDownVoted, hasUpVoted, path } = params;

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upVotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downVotes: userId },
        $push: { upVotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upVotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function DownVoteAnswer(params: AnswerVoteParams) {
  try {
    connectDB();

    const { userId, answerId, hasDownVoted, hasUpVoted, path } = params;

    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downVotes: userId } };
    } else if (hasUpVoted) {
      updateQuery = {
        $push: { downVotes: userId },
        $pull: { upVotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downVotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
