"use server";

import { connectDB } from "../mongoose";

export async function createQuestion(formData: any) {
  try {
    connectDB();
  } catch (error) {}
}
