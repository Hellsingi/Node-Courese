
import * as usersRepo from './user.memory.repository';
import * as taskRepo from '../tasks/task.memory.repository';
import { IUserProps } from './user.types';

const getAll = () => usersRepo.getAllUsers();

const save = (data: IUserProps) => usersRepo.createUser(data);

// const getById = async (id: string): Promise<IUserProps | {}> => {
//   const user = await usersRepo.getById(id);
//   if (!user) return {};

//   return user;
// };
const getById = (id: string) => usersRepo.getById(id);

const deleteUser = async (id: string) => {
  taskRepo.removeUsersTasks(id);
  return usersRepo.deleteUser(id);
};

const update = (user: IUserProps, updateInfo: Partial<IUserProps>) => usersRepo.updateUser(user, updateInfo);

export { getAll, save, getById, deleteUser, update };
