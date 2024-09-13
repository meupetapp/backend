import { getHomePage } from '../controllers/homeController.js';
import { register, login } from '../controllers/userController.js';
const routes = [
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
];
export default routes;
