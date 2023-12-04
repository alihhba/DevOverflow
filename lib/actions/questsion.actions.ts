"use server";

import Answer from "@/database/answer-model";
import Interaction from "@/database/interaction-model";
import Question from "@/database/question-model";
import Tag from "@/database/tag-schema";
import User from "@/database/user-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "../mongoose";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./types";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectDB();

    const { title, content, tags, path, author } = params;
    // console.log(params);

    const question = await Question.create({
      title,
      content,
      author,
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

    return { question };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function UpVoteQuestion(params: QuestionVoteParams) {
  try {
    connectDB();

    const { hasUpVoted, hasDownVoted, questionId, userId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      redirect("/sign-in");
      throw new Error("user not found");
    }

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upVotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $push: { upVotes: userId },
        $pull: { downVotes: userId },
      };
    } else updateQuery = { $addToSet: { upVotes: userId } };

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function DownVoteQuestion(params: QuestionVoteParams) {
  try {
    connectDB();

    const { hasDownVoted, hasUpVoted, questionId, path, userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      redirect("/sign-in");
      throw new Error("user not found");
    }

    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = {
        $pull: { downVotes: userId },
      };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: {
          upVotes: userId,
        },
        $push: { downVotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downVotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function DeleteQuestion(params: DeleteQuestionParams) {
  try {
    connectDB();
    const { path, questionId } = params;

    const question = await Question.findById(questionId);

    if (!question) {
      console.log("question not found");
      throw new Error("question not found");
    }

    await Question.findByIdAndDelete(question);
    await Answer.deleteMany({ question: questionId });
    await Tag.updateMany({}, { $pull: { questions: questionId } });
    await Tag.deleteMany({ questions: { $size: 0 } });
    await Interaction.deleteMany({ question: questionId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
