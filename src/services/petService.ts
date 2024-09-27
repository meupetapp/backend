import Pet, { CreatePetDTO, IPet, UpdatePetDTO } from "../models/petModel";
import { IUser } from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export const createPet = async (pet: CreatePetDTO, user: IUser): Promise<IPet | null> => {
  const newPet = new Pet({ ...pet, userId: user.id || user._id, active: true });
  return newPet.save();
}

export const updatePet = async (pet: UpdatePetDTO, user: IUser): Promise<IPet | null> => {
  try {
    const updatedPet = await Pet.findOneAndUpdate({ _id: pet.id, userId: user.id || user._id }, { ...pet, updatedAt: new Date() }, { new: true });
    return updatedPet;
  } catch (error) {
    throw new Error('Pet não encontrado');
  }
}

export const findByUser = async (userId: string): Promise<IPet[]> => {
  try {
    return Pet.find({ userId });
  } catch (error) {
    console.log('@error', error);
    throw new Error('Pets não encontrados');
  }
}

export const findById = async (id: string): Promise<IPet | null> => {
  try {
    return Pet.findById(id);
  } catch (error) {
    throw new Error('Pet não encontrado');
  }
}
