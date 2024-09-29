import { FastifyRequest, FastifyReply } from 'fastify';
import { registerUser, loginUser, findUserByToken } from '../services/userService';

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
    const res = await loginUser(email, password);
    reply.send({ message: 'Login com sucesso', ...res });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
};

export const getUserInfo = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const token = req.headers.authorization || '';
    const user = await findUserByToken(token);
    
    if (!user) {
      reply.code(404).send({ message: 'Usuário não encontrado' });
      return;
    }

    const { username, email, _id } = user;
    reply.send({ user: { id: _id, username, email } });
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};