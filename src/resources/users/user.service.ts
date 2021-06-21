import * as usersRepo from './user.memory.repository';
import * as taskRepo from '../tasks/task.memory.repository';
// import { IUserProps } from './user.types';
import { UserDB } from '../../modelsDb/User';

const getAll = () => usersRepo.getAllUsers();

// const save = (data: UserDB) => usersRepo.createUser(data);
const save = (name: string, login: string, password: string) => usersRepo.createUser(name, login, password);


const getById = (id: string) => usersRepo.getById(id);

const deleteUser = (id: string): Promise<boolean> => {
  taskRepo.removeUsersTasks(id);
  return usersRepo.deleteUser(id);
};

const update = (user: UserDB, updateInfo: Partial<UserDB>) => usersRepo.updateUser(user, updateInfo);

export { getAll, save, getById, deleteUser, update };
