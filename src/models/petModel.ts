import mongoose, { Document, Schema } from "mongoose";

export interface IPet extends Document {
  name: string;
  photo: string;
  species: string;
  breed: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isAdopted: boolean;
  dateAdoption?: Date;
  birthDate: Date;
}

export interface CreatePetDTO {
  name: string;
  photo: string;
  species: string;
  breed: string;
  isAdopted: boolean;
  dateAdoption?: Date;
  birthDate: Date;
  sex: string;
  color: string;
}

export interface UpdatePetDTO {
  id: string;
  name?: string;
  photo?: string;
  species?: string;
  breed?: string;
  isAdopted?: boolean;
  isEnable?: boolean;
  dateAdoption?: Date;
  birthDate?: Date;
  sex?: string;
  color?: string;
}

const PetSchema: Schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isAdopted: { type: Boolean, required: true },
  isEnable: { type: Boolean, default: true },
  dateAdoption: { type: Date },
  birthDate: { type: Date, required: true }
});

export default mongoose.model<IPet>('Pet', PetSchema);