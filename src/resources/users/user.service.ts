import * as usersRepo from './user.memory.repository';
import { UserDB } from '../../modelsDb/User';
import { IProps } from './user.types';

const getAll = (): Promise<UserDB[]> => usersRepo.getAllUsers();

const save = (name: string, login: string, password: string): Promise<UserDB> => usersRepo.createUser(name, login, password);

const getById = (id: string): Promise<UserDB | undefined> => usersRepo.getById(id);

const deleteUser = (id: string): Promise<boolean> => usersRepo.deleteUser(id);

const update = (user: UserDB, updateInfo: Partial<UserDB>): Promise<UserDB | null> => usersRepo.updateUser(user, updateInfo);

const getByProps = (props: IProps): Promise<UserDB | null> => usersRepo.getByProps(props);

export { getAll, save, getById, deleteUser, update, getByProps };
