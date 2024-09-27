import UserPermission, { IUserPermission } from "../models/userPermissionModel";
import { findById } from "./petService";

export const createUserPermission = async (userId: string, petId: string, permissions: string[], ownerUserId: string): Promise<IUserPermission | null> => {
  const pet = await findById(petId);
  if (!pet || pet.userId !== ownerUserId) {
    throw new Error('Pet não encontrado');
  }
  const userPermission = new UserPermission({ userId, petId, permissions });
  return userPermission.save();
}
