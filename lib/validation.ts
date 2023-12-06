import * as z from "zod";

export const questionSchema = z.object({
  title: z.string().min(10).max(100),
  explanation: z.string(),
  // .min(20, { message: "explanation must between 20 - 400 characters" })
  // .max(400, { message: "explanation must between 20 - 400 characters" }),
  tags: z.array(z.string().min(1).max(20)).min(1).max(5),
});

export const answerSchema = z.object({
  answer: z.string().min(10),
});

export const profileSchema = z.object({
  portfolioWeb: z.string().max(40),
  location: z.string().max(80),
  bio: z.string().max(100),
});
