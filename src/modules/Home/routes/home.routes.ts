import express, { Request, Response } from 'express';
import User, { IUser } from '@modules/User/models/Users';
import { HomeController } from '../controllers/Home.controller';

import { verifyToken } from '@shared/middleware/verifyToken';

const homeRouter = express.Router();


const homeController = new HomeController();
// Cria um novo usuário
// POST /user
// PARAMS :
// name; email

homeRouter.use(verifyToken);

homeRouter.get('/', homeController.show);

// 

export {homeRouter};
