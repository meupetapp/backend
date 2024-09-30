import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  type: string;
  description: string;
  photo: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  notes: string[];
  createdBy: string;
  time: Date;
  tags: string[];         
  completed: boolean;     
}

const ActivitySchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  createdBy: { type: String, required: true },
  time: { type: Date, required: true },
  tags: { type: [String], default: [] },   
  completed: { type: Boolean, default: false }  
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);