import { FastifyReply, FastifyRequest } from "fastify";
import { CreateActivityDTO } from "../models/activityModel";
import createActivity, { findActivitiesByPetId, createComment } from "../services/activityService";
import { findUserByToken } from "../services/userService";

export const createActivityController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const activity = req.body as CreateActivityDTO;
    const user = await findUserByToken(req.headers.authorization || '');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const createdActivity = await createActivity(activity, user);
    reply.code(201).send({ message: 'Atividade cadastrada com sucesso', createdActivity });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}

export const listActivitiesByPetId = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = req.params as any;
    const petId = params.petId as string;
    const user = await findUserByToken(req.headers.authorization || '');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    // TODO: adicionar validação para retornar atividades apenas de pets que o usuário tem permissão
    const activities = await findActivitiesByPetId(petId);
    reply.code(200).send({ activities });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}

export const createCommentController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = req.params as any;
    console.log(params)
    const activityId = params.activityId as string;
    const user = await findUserByToken(req.headers.authorization || '');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const comment = req.body as { text: string };

    const activity = await createComment(activityId, comment, user);

    reply.code(201).send({ message: 'Comentário adicionado com sucesso', activity });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}
