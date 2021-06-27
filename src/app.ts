import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs'

import userRouter from './resources/users/user.router';
import boardRouter from './resources/board/board.router';
import taskRouter from './resources/tasks/task.router';
import loginRouter from './resources/login/login.router';
import { httpLogger } from './middleware/http-logger';
import { ExtendedError } from './logger/logger';
import { errorHandlerMiddleware } from './middleware/errorHandler';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(httpLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter)
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);


app.use((err: Error | ExtendedError, _req: Request, res: Response, next: NextFunction) => {
  errorHandlerMiddleware({ error: err, res });
  next();
})

process.on('uncaughtException', (error: Error) => {
  errorHandlerMiddleware({ error, exception: true });
})

process.on('unhandledRejection', (error: Error) => {
  errorHandlerMiddleware({ error });
})

export default app;
