import mongoose, { Schema, Document } from "mongoose";

export interface IUserPermission extends Document {
  petId: string;
  userId: string;
  username?: string;
  permissions: string[];
  sentAt: Date;
  status: string;
}

const UserPermissionSchema: Schema = new Schema({
  petId: { type: String, required: true },
  userId: { type: String, required: true },
  permissions: { type: [String], required: true },
  sentAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
});

export default mongoose.model<IUserPermission>('UserPermission', UserPermissionSchema);