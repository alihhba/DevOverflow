import { Schema, models, model, Document } from "mongoose";
import User from "./user-schema";
import Question from "./question-model";
import Answer from "./answer-model";
import Tag from "./tag-schema";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdAt: Date;
}

const interactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User, required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: Question },
  answer: { type: Schema.Types.ObjectId, ref: Answer },
  tags: [{ type: Schema.Types.ObjectId, ref: Tag }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Interaction =
  models.Interaction || model("Interaction", interactionSchema);

export default Interaction;
