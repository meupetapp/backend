import Fastify from 'fastify';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';
dotenv.config();
const fastify = Fastify({ logger: true });
routes.forEach((route) => fastify.route(route));
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.log('Erro na conexão ao MongoDB', err));
const start = async () => {
    try {
        await fastify.listen({ port: parseInt(process.env.PORT), host: 'localhost' });
        console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
