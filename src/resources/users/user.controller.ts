import { Response } from 'express';
import User from '../../entity/user.entity';
import bcrypt from 'bcryptjs';
import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';

function toResponse(user: User) {
  return { id: user.id?.toString(), name: user.name, login: user.login };
}

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {
  }

  @Get()
  async getAll(@Res() res: Response) {
    const users = await this.usersService.getAll();
    res.json(users.map(toResponse));
  }

  @Post()
  async createBoard(@Body() rawUser: any, @Res() res: Response) {
    rawUser.password = bcrypt.hashSync(rawUser.password, 8);

    if (rawUser.login === 'admin') {
      if (rawUser.secretPass) delete rawUser.secretPass;
      const admin = await this.usersService.createAdmin(rawUser);
      if (admin === 204) {
        res.status(201).json({ exists: true });
      } else {
        res.status(201).json(toResponse(admin as User));
      }
    } else {
      const user = await this.usersService.createUser(rawUser);
      res.status(201).json(toResponse(user as User));
    }
  }

  @Get(':id')
  async getById(@Param() params, @Res() res: Response) {
    const { id } = params;
    if (id) {
      const user = await this.usersService.getById(Number(id));
      if (user) res.json(toResponse(user));
    }
  }

  @Put(':id')
  async putById(@Param() params, @Body() rawUser: User, @Res() res: Response) {
    const { id } = params;
    if (id) {
      const user = await this.usersService.putById(rawUser, Number(id));
      if (user) res.json(toResponse(user));
    }
  }

  @Delete(':id')
  async deleteById(@Param() params, @Res() res: Response) {
    const { id } = params;
    if (id) {
      const status = await this.usersService.deleteById(Number(id));
      res.status(status).send();
    }
  }
}


