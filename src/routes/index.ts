import { RouteOptions } from 'fastify';
import { getHomePage } from '../controllers/homeController.js';
import { register, login } from '../controllers/userController.js';
import {
  create as createPet,
  deletePet,
  getPetDetails,
  listByUser,
  update as updatePet
} from '../controllers/petController.js';

const routes: RouteOptions[] = [
  {
    method: 'GET',
    url: '/',
    handler: getHomePage,
  },
  {
    method: 'POST',
    url: '/register',
    handler: register,
  },
  {
    method: 'POST',
    url: '/login',
    handler: login,
  },
  {
    method: 'POST',
    url: '/pet',
    handler: createPet
  },
  {
    method: 'PUT',
    url: '/pet',
    handler: updatePet
  },
  {
    method: 'DELETE',
    url: '/pet',
    handler: deletePet
  },
  {
    method: 'GET',
    url: '/user/:userId/pets',
    handler: listByUser
  },
  {
    method: 'GET',
    url: '/pet/:petId',
    handler: getPetDetails
  }
];

export default routes;
