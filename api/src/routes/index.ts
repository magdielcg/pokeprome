import { Router } from 'express';
import user from './user.routes';
import login from './login.routes';

const routes = Router();

routes.use('/user', user);
routes.use('/login', login);


export default routes;
