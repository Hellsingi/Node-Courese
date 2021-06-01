
import * as usersRepo from './user.memory.repository';
import * as taskRepo from '../tasks/task.memory.repository';
import { IUserProps } from './user.types';

const getAll = () => usersRepo.getAllUsers();

const save = (data: IUserProps) => usersRepo.createUser(data);

const getById = (id: string) => usersRepo.getById(id);

const deleteUser = async (id: string) => {
  taskRepo.removeUsersTasks(id);
  return usersRepo.deleteUser(id);
};

const update = (user: IUserProps, updateInfo: Partial<IUserProps>) => usersRepo.updateUser(user, updateInfo);

export { getAll, save, getById, deleteUser, update };
