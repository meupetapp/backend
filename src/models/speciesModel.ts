import mongoose, { Document, Schema } from 'mongoose';

export interface ISpecies extends Document {
  speciesNamePT: string;
  speciesNameEN: string;
}

const SpeciesSchema: Schema = new Schema({
  speciesNamePT: { type: String, required: true },
  speciesNameEN: { type: String, required: true },
});

export default mongoose.model<ISpecies>('Species', SpeciesSchema);
