import { getRepository } from 'typeorm';
import { IUserProps } from './user.types';
import { UserDB } from '../../modelsDb/User';

const getAllUsers = async (): Promise<UserDB[]> => {
  const userRepository = await getRepository(UserDB);
  const allUsers = await userRepository.find();
  return allUsers;
};

const createUser = async (name: string, login: string, password: string): Promise<UserDB> => {
  const userRepository = await getRepository(UserDB);
  const newUser = await userRepository.create({ name, login, password });
  const savedUser = await userRepository.save(newUser);
  return savedUser;
};

const getById = async (id: string): Promise<UserDB | undefined> => {
  const userRepository = await getRepository(UserDB);
  const findUser = await userRepository.findOne(id);
  return findUser;
};

const deleteUser = async (id: string): Promise<boolean> => !!(await getRepository(UserDB).delete(id));

const updateUser = async (user: UserDB, updateInfo: Partial<IUserProps>): Promise<UserDB | null> => {
  const userRepository = await getRepository(UserDB);
  const findUser = await userRepository.findOne(user.id);
  if (findUser === undefined) return null;
  if (user.id === undefined) return null;
  await userRepository.update(user.id, { ...updateInfo });
  return findUser;
};

export { getAllUsers, createUser, getById, deleteUser, updateUser };