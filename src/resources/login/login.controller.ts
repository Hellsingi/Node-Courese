import { Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getRepository } from 'typeorm';
import User from '../../entity/user.entity';
import bcrypt from 'bcryptjs';
import { Body, Controller, Post, Res } from '@nestjs/common';

dotenv.config();

@Controller('login')
export class LoginController {

  @Post()
  async login(@Body() loginBody: any, @Res() res: Response) {
    const userRouter = getRepository(User);
    const user = await userRouter.findOne({
      login: loginBody.login
    });
    if (user) {
      bcrypt.compare(loginBody.password, user.password).then((result) => {
        if (result) {
          const token = jwt.sign({
            login: loginBody.login,
            password: loginBody.password
          }, process.env['JWT_SECRET_KEY']);
          res.json({ token });
        } else {
          res.status(405).send('Wrong password');
        }
      });
    } else {
      res.status(401).send('Forbidden');
    }
  }
}
