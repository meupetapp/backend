import Fastify, { FastifyInstance, RouteOptions } from 'fastify';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index';

dotenv.config();

const fastify: FastifyInstance = Fastify({ logger: true });

routes.forEach((route: RouteOptions) => fastify.route(route));

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro na conexão ao MongoDB', err));

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: parseInt(process.env.PORT as string), host: 'localhost' });
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
