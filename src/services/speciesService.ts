import Species, { ISpecies } from '../models/speciesModel';

export const getAllSpecies = async (): Promise<ISpecies[]> => {
  return Species.find({});
};

export const createSpecies = async (specieData: ISpecies): Promise<ISpecies> => {
  const species = new Species(specieData);
  return species.save();
};
