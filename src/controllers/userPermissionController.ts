import { FastifyReply, FastifyRequest } from "fastify";
import { createUserPermission } from "../services/userPermissionService";
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