import createNotification, { getNotification } from '../services/notificationService';
import { findUserByToken } from '../services/userService';
import { FastifyRequest, FastifyReply } from 'fastify';

export interface CreateNotificationDTO {
  text?: string;
  userId?: string;
}

export const createNotificationController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const notification = req.body as CreateNotificationDTO;
    const user = await findUserByToken(req.headers.authorization || '');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    console.log("@1", notification)
    const createdActivity = await createNotification(notification);
    reply.code(201).send({ message: 'Atividade cadastrada com sucesso', createdActivity });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}

export const getNotificationByUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await findUserByToken(req.headers.authorization || '');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const notifications = await getNotification(user._id);
    reply.code(200).send({ notifications });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}