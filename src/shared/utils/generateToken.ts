import { jwt_config, refreshToken_config } from '@config/auth';

import { sign } from 'jsonwebtoken';

export const jwtGenerate = (
  email: string,
  user_id:string
): string => {
  return sign({ email,  user_id }, jwt_config.secret, {
    expiresIn: jwt_config.expiresIn,
  });
};


export const refreshToken = (
    email: string,
    user_id:string
  ): string => {
    return sign({ email,  user_id }, jwt_config.secret, {
      expiresIn: refreshToken_config.expiresIn,
    });
  };