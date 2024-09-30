import { FastifyRequest, FastifyReply } from 'fastify';
import { listActivities, createActivity } from '../services/activityService';
import { IActivity } from '../models/activityModel';

export const getActivities = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const tags = (req.query as any).tags?.split(',') || [];
    const completed = (req.query as any).completed ? (req.query as any).completed === 'true' : undefined;

    const activities = await listActivities(tags, completed);
    reply.send({ activities });
  } catch (error) {
    const err = error as Error;
    reply.code(500).send({ error: err.message });
  }
};

export const addActivity = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const activityData = req.body as Partial<IActivity>;
    const newActivity = await createActivity(activityData);
    reply.code(201).send({ message: 'Atividade criada com sucesso', newActivity });
  } catch (error) {
    const err = error as Error;
    reply.code(500).send({ error: err.message });
  }
};
