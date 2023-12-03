"use server";

import Interaction from "@/database/interaction-model";
import Question from "@/database/question-model";
// import { revalidatePath, revalidateTag } from "next/cache";
import { connectDB } from "../mongoose";
import { ViewQuestionParams } from "./types";

export async function ViewQuestion(params: ViewQuestionParams) {
  try {
    connectDB();

    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const exitingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (exitingInteraction) {
        return console.log("user has already viewed");
      }

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
