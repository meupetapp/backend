import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  text: string;
  userId: string;
  createdAt: Date;
  read: boolean;
}

const NotificationSchema = new Schema({
  text: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

export default mongoose.model('NotificationM', NotificationSchema);

