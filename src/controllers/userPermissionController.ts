import { FastifyReply, FastifyRequest } from "fastify";
import { createUserPermission, findUserPermissionsByPetId } from "../services/userPermissionService";
import { findByEmail, findUserByToken } from "../services/userService";

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { userEmail, petId, permissions } = req.body as any;
    const user = await findUserByToken(req.headers.authorization || '');
    const userToReceivePermission = await findByEmail(userEmail);

    if (!user || !userToReceivePermission) {
      throw new Error('Usuário não encontrado');
    }
    const userPermission = await createUserPermission(userToReceivePermission._id, petId, permissions, user.id);
    reply.code(201).send({ message: 'Permissão criada com sucesso', userPermission });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}

export const listUserPermissionsByPetId = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { petId } = req.params as any;

    const userPermissions = await findUserPermissionsByPetId(petId);
    reply.code(200).send({ userPermissions });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}