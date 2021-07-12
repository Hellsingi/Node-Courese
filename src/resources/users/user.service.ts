import User from '../../entity/user.entity';

import usersRepo from './user.memory.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAll = (): Promise<User[]> => usersRepo.getAll();

  createUser = (user: User): Promise<User | number> => usersRepo.createUser(user);

  createAdmin = (user: User): Promise<User | number> => usersRepo.createAdmin(user);

  getById = (id: number): Promise<User | undefined> => usersRepo.getById(id);

  putById = (newUser: User, id: number): Promise<User | undefined> => usersRepo.putById(newUser, id);

  deleteById = (id: number): Promise<number> => usersRepo.deleteById(id);
}

