import { getHomePage } from '../controllers/homeController.js';
const routes = [
    {
        method: 'GET',
        url: '/',
        handler: getHomePage,
    }
];
export default routes;
