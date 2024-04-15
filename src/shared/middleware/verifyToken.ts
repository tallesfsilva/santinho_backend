 
 
import { Request, Response, NextFunction } from 'express';
import { jwt_config } from '@config/auth';
import { verify } from 'jsonwebtoken';
 

import { AppError } from '@shared/errors/AppError';
import User,{IUser} from '@modules/User/models/Users'

async function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT inexistente!', 404);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, jwt_config.secret as string);
    const {user_id, email} = decoded as {
      user_id: string;
      email: string;
    };
  

    const userExists = await User.findById(user_id);
     
    if (!userExists) {
      throw new AppError('Usuário não encontrado', 404);
    }
 
    request.user = {
      id: userExists.id,
      email : userExists.email
    };
 

    return next();
  } catch (error) {
    console.log('🚀 ~ file: verifyToken.ts:31 ~ error:', error);

    throw new AppError('Token Inválido', 401);
  }
}

export { verifyToken };
