"use server";
import User from "@/database/user-schema";
import { connectDB } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./types.d";
import Tag from "@/database/tag-schema";
import Question from "@/database/question-model";

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

export async function GetAllTags(params: GetAllTagsParams) {
  try {
    connectDB();

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectDB();

    const { tagId, searchQuery } = params;

    const tag = await Tag.findOne({ _id: tagId }).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},

      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "name clerkId _id picture" },
      ],
    });

    if (!tag) {
      throw new Error("tag not found");
    }

    return tag;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
