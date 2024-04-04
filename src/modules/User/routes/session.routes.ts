import express, { Request, Response } from 'express';
import User, { IUser } from '@modules/User/models/Users';
import { UserController } from '../controllers/User.controller';
import { SessionController } from '../controllers/Session.controller';
 
import { verifyToken } from '@shared/middleware/verifyToken';

const sessionRouter = express.Router();



 
const sessionController = new SessionController();
// Cria uma session para o usuario
// POST /session
// PARAMS :
// name; email, token

sessionRouter.post('/',  sessionController.create);
sessionRouter.use(verifyToken);
sessionRouter.delete('/',  sessionController.destroy);
 
export {sessionRouter};
