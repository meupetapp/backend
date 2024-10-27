import UserPermission, { IUserPermission } from "../models/userPermissionModel";
import { findById } from "./petService";
import { findUserById } from "./userService";

export const createUserPermission = async (userId: string, petId: string, permissions: string[], ownerUserId: string): Promise<IUserPermission | null> => {
  const pet = await findById(petId);
  if (!pet || pet.userId !== ownerUserId) {
    throw new Error('Pet não encontrado');
  }
  const userPermission = new UserPermission({ userId, petId, permissions });
  return userPermission.save();
}

export const findUserPermissionsByPetId = async (petId: string): Promise<IUserPermission[]> => {
  const userPermissions = await UserPermission.find({ petId });

  const newResponse = await Promise.all(
    userPermissions.map(async (userPermission) => {
      const user = await findUserById(userPermission.userId);
      return { ...userPermission.toObject(), username: user?.username }; // Use toObject() if using Mongoose to ensure proper structure
    })
  );

  return newResponse as IUserPermission[];
}
export const findPetsByUserId = async (userId: string): Promise<string[]> => {
  // Busca todas as permissões do usuário
  const userPermissions = await UserPermission.find({ userId });

  // Extrai apenas os petIds das permissões encontradas
  const petIds = userPermissions.map((permission) => permission.petId);

  return petIds;
}

