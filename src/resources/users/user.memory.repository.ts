import User from '../../entity/user.entity';
import { getRepository } from 'typeorm';
import TaskRepository from '../task/task.memory.repository';


const getAll = async (): Promise<User[]> => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

const createAdmin = async (user: User): Promise<User | number> => {
  const userRepository = getRepository(User);
  const exist = await userRepository.findOne({ login: 'admin' });
  if (exist) return 204
  const newUser = userRepository.create(user);
  return await userRepository.save(newUser);
};

const createUser = async (user: User): Promise<User | number> => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create(user);
  return await userRepository.save(newUser);
};


const getById = async (id: number): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne(id);
};


const putById = async (newUser: User, id: number): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  await userRepository.update(id, newUser);
  return newUser;
};


const deleteById = async (id: number): Promise<number> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  if (user) {
    await TaskRepository.deleteUser(id);
    await userRepository.delete(id);
    return 204;
  }
  return 404;
};

export default { getAll, createUser, getById, putById, deleteById, createAdmin };
