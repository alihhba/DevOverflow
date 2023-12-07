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
    const { searchQuery, page = 1, pageSize = 12, filter } = params;

    const skipPage = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "popular":
        sortOptions = { questions: -1 };
        break;
    }

    const tags = await Tag.find(query)
      .limit(pageSize)
      .skip(skipPage)
      .sort(sortOptions);
    const totalTags = await Tag.find(query);

    const isNext = totalTags.length > skipPage + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectDB();

    const { tagId, searchQuery, page = 1, pageSize = 12, filter } = params;

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

    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upVotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;
    }

    const skipPage = (page - 1) * pageSize;

    const tag = await Tag.findOne({ _id: tagId }).populate({
      path: "questions",
      model: Question,
      match: query,
      options: {
        sort: sortOptions,
        limit: pageSize,
        skip: skipPage,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "name clerkId _id picture" },
      ],
    });

    const totalTag = await Tag.findOne({ _id: tagId }).populate({
      path: "questions",
      model: Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
    });

    if (!tag) {
      throw new Error("tag not found");
    }

    const isNext =
      totalTag?.questions.length > skipPage + tag?.questions.length;

    return { tag, isNext };
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
