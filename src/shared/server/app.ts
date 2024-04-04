import express, { json, Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import { LoggerStream } from '@config/winston';

import bodyParser from 'body-parser';
import { router } from './routes';
import { globalErrorHandler } from '../middleware/globalErrorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(router);

 
morgan.token('body', (req: Request) => JSON.stringify(req.body));
morgan.token('user', (req: Request) => JSON.stringify(req.user));
app.use(
  morgan(
    `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - "body": ':body' - ":referrer" "user: ':user' ":user-agent"`,
    {
      skip: (req, res) => res.statusCode >= 400,
      stream: new LoggerStream(),
    },
  ),
);


app.use(json());
app.use(
    cors({
      credentials: true,
    }),
  );

  app.use(globalErrorHandler);

export {app}