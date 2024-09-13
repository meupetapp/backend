import { registerUser, loginUser } from '../services/userService.js';
export const register = async (req, reply) => {
    try {
        const { username, email, password } = req.body;
        const user = await registerUser(username, email, password);
        reply.code(201).send({ message: 'Registro com sucesso', user });
    }
    catch (error) {
        const err = error;
        reply.code(400).send({ error: err.message });
    }
};
export const login = async (req, reply) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        reply.send({ message: 'Login com sucesso', token });
    }
    catch (error) {
        const err = error;
        reply.code(400).send({ error: err.message });
    }
};
