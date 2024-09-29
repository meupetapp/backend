import { FastifyReply, FastifyRequest } from "fastify";
import { findUserById, findUserByToken } from "../services/userService";
import { createPet, findByUser, updatePet } from "../services/petService";
import { CreatePetDTO, UpdatePetDTO } from "../models/petModel";
import { checkUserPermission } from "../services/userService";
import Pet from "../models/petModel";
import { findActivitiesByPetId } from "../services/activityService";

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
};

export const update = async (req: FastifyRequest, reply: FastifyReply) => {
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
};

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
};

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
};

export const getPetDetails = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const petId = (req.params as any).petId;
    const userId = req.headers.authorization; 
    
    if (!userId) {
      return reply.code(401).send({ message: "Usuário não fornecido."});
    }

    // const hasPermission = await checkUserPermission(userId, petId);
    
    // if (!hasPermission) {
    //   return reply.code(403).send({ message: "Você não tem permissão para acessar esse pet." });
    // }

    const pet = await Pet.findById(petId);
    const activities = await findActivitiesByPetId(petId);

    if (!pet) {
      return reply.code(404).send({ message: "Pet não encontrado." });
    }

    reply.send({ pet, activities });
  } catch (error) {
    reply.code(500).send({ message: "Erro na busca." });
  }
};