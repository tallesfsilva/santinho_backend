import { Router, Request, Response, NextFunction } from 'express';

import{userRouter} from '../../modules/User/routes/user.routes'
import{sessionRouter} from '../../modules/User/routes/session.routes'
import{homeRouter} from '../../modules/Home/routes/home.routes'

const router = Router();

router.use('/user', userRouter);
router.use('/session', sessionRouter);
router.use('/home', homeRouter)

router.get('/', (request: Request, response: Response) =>
  response.send('Fale Mais - 14-03-24 10:00'),
);

router.use((request: Request, response: Response, next: NextFunction) => {
  if (!request.route)
    return response.status(404).send(`${request.url} não encontrado`);
  return next();
});

export { router };