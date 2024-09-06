import Fastify from 'fastify';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';

dotenv.config();

const fastify = Fastify({ logger: true });

routes.forEach((route) => fastify.route(route));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error in MongoDB connection', err));

const start = async() => {
    try {
        fastify.listen({ port: process.env.PORT, host: 'localhost' });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();