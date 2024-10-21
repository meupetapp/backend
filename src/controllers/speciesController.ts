import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllSpecies } from '../services/speciesService';

export const listSpecies = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const species = await getAllSpecies();
    reply.send({ species });
  } catch (error) {
    const err = error as Error;
    reply.code(500).send({ error: err.message });
  }
};
