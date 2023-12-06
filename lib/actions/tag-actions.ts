"use server";
import Question from "@/database/question-model";
import Tag from "@/database/tag-schema";
import User from "@/database/user-schema";
import { FilterQuery } from "mongoose";
import { connectDB } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./types.d";

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
    const { searchQuery } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    const tags = await Tag.find(query);

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

    const words = searchQuery && searchQuery.trim().split(/\s+/);

    const wordPatterns =
      words && words.map((word) => new RegExp(`\\b${word}\\b`, "i"));

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
        { title: { $in: wordPatterns } },
        { content: { $in: wordPatterns } },
      ];
    }

    const tag = await Tag.findOne({ _id: tagId }).populate({
      path: "questions",
      model: Question,
      match: query,
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

export async function GetTopTags() {
  try {
    connectDB();

    const tags = await Tag.aggregate([
      { $project: { name: 1, questionCount: { $size: "$questions" } } },
      { $sort: { questionCount: -1 } },
      { $limit: 5 },
    ]);

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
