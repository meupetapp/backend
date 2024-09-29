import mongoose, { Document, Schema } from "mongoose";

export interface IActivity extends Document {
  title: string;
  type: string;
  description: string;
  photo: string;
  userId: string;
  petId: string;
  createdAt: Date;
  updatedAt: Date;
  // notes: Note[];
  // createdByUserId: string;
  time: Date;
}

export interface CreateActivityDTO {
  title: string;
  type: string;
  description: string;
  photo?: string;
  userId: string;
  time: Date;
}

const ActivitySchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: false },
  userId: { type: String, required: true },
  petId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  time: { type: Date, required: true }
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
