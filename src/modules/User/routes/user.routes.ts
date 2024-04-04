import express, { Request, Response } from 'express';
import User, { IUser } from '@modules/User/models/Users';
import { UserController } from '../controllers/User.controller';

import { verifyToken } from '@shared/middleware/verifyToken';

const userRouter = express.Router();


const userController = new UserController();
// Cria um novo usuário
// POST /user
// PARAMS :
// name; email
userRouter.post('/', userController.create);

// Retorna todos os usuários
// GET /user
userRouter.get('/',  verifyToken, userController.index);

// Get user by ID
//GET /user/:user_id
userRouter.get('/:user_id', verifyToken, userController.show);

// Update user by ID
// PUT /user/:user_id
userRouter.put('/:userId', verifyToken, userController.update);

 //Delete user 
 //DELETE /user/:user_id
userRouter.delete('/:user_id',verifyToken, userController.delete);

export {userRouter};
