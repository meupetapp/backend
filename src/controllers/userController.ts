import { FastifyRequest, FastifyReply } from 'fastify';
import { registerUser, loginUser } from '../services/userService.js';

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { username, email, password } = req.body as any;
    const user = await registerUser(username, email, password);
    reply.code(201).send({ message: 'Registro com sucesso', user });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, password } = req.body as any;
    const token = await loginUser(email, password);
    reply.send({ message: 'Login com sucesso', token });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
};
