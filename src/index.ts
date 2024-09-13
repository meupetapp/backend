import Fastify, { FastifyInstance, RouteOptions } from 'fastify';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';

dotenv.config();

const fastify: FastifyInstance = Fastify({ logger: true });

routes.forEach((route: RouteOptions) => fastify.route(route));

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error in MongoDB connection', err));

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: parseInt(process.env.PORT as string), host: 'localhost' });
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
