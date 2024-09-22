import { FastifyReply, FastifyRequest } from "fastify";
import { findUserById, findUserByToken } from "../services/userService";
import { createPet, findByUser, updatePet } from "../services/petService";
import { CreatePetDTO, UpdatePetDTO } from "../models/petModel";

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const pet = req.body as CreatePetDTO;
    const user = await findUserByToken(req.headers.authorization || '');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const createdPet = await createPet(pet, user);
    reply.code(201).send({ message: 'Pet cadastrado com sucesso', createdPet });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}

export const upate = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const pet = req.body as UpdatePetDTO;
    const user = await findUserByToken(req.headers.authorization || '');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const createdPet = await updatePet(pet, user);
    reply.code(201).send({ message: 'Pet atualizado com sucesso', createdPet });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}

export const deletePet = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const pet = req.body as UpdatePetDTO;
    const user = await findUserByToken(req.headers.authorization || '');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const createdPet = await updatePet({ ...pet, isEnable: false, }, user);
    reply.code(201).send({ message: 'Pet atualizado com sucesso', createdPet });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}

export const listByUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = req.params as any;
    const userId = params.userId as string;

    const userById = await findUserById(userId);
    const user = await findUserByToken(req.headers.authorization || '');
    if ((!user && !userById) || user?.email !== userById?.email) {
      throw new Error('Usuário não encontrado');
    }
    const pets = await findByUser(user?.id || '');
    reply.send({ pets });
  } catch (error) {
    const err = error as Error;
    reply.code(400).send({ error: err.message });
  }
}