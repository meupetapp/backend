import { RouteOptions } from 'fastify';
import { getHomePage } from '../controllers/homeController.js';

const routes: RouteOptions[] = [
  {
    method: 'GET',
    url: '/',
    handler: getHomePage,
  }
];

export default routes;
