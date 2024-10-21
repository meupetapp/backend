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
import { create, listUserPermissionsByPetId } from '../controllers/userPermissionController.js';
import { createActivityController, createCommentController, listActivitiesByPetId } from '../controllers/activityController.js';
import { generateUploadUrl, generateDownloadUrl } from '../controllers/awsController.js';
import { listSpecies } from '../controllers/speciesController.js';

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
  },
  {
    method: 'POST',
    url: '/permission',
    handler: create
  },
  {
    method: 'GET',
    url: '/permission/pet/:petId',
    handler: listUserPermissionsByPetId
  },
  {
    method: 'POST',
    url: '/activity',
    handler: createActivityController
  },
  {
    method: 'GET',
    url: '/activity/pet/:petId',
    handler: listActivitiesByPetId
  },
  {
    method: 'POST',
    url: '/generate-upload-url',
    handler: generateUploadUrl
  },
  {
    method: 'GET',
    url: '/get-download-url',
    handler: generateDownloadUrl
  },
  {
    method: 'POST',
    url: '/comment/activity/:activityId',
    handler: createCommentController
  },
  {
    method: 'GET',
    url: '/species',
    handler: listSpecies,
  },
];

export default routes;
