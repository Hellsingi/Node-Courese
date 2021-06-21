import { getRepository } from 'typeorm';
import { IUserProps } from './user.types';
import { UserDB } from '../../modelsDb/User';

// const dbUsers: UserDB[] = [];

// const getAllUsers = async () => dbUsers;
const getAllUsers = async (): Promise<UserDB[]> => {
  const userRepository = await getRepository(UserDB);
  const allUsers = await userRepository.find();
  return allUsers;
}

// const createUser = async (user: IUserProps) => dbUsers.push(user);

const createUser = async (name: string, login: string, password: string) => {
  const userRepository = await getRepository(UserDB);
  const newUser = await userRepository.create({ name, login, password });
  const savedUser = await userRepository.save(newUser);
  return savedUser;
};

// const getById = async (id: string) => dbUsers.find((user) => user.id === id);

const getById = async (id: string) => {
  const userRepository = await getRepository(UserDB);
  const findUser = await userRepository.findOne(id);
  return findUser;
}

// const deleteUser = async (id: string) => {
//   const user = await getById(id);
//   if (!user) return null;
//   const idx = dbUsers.indexOf(user);
//   dbUsers.splice(idx, 1);
//   return user;
// };


const deleteUser = async (id: string) => {
  const userRepository = await getRepository(UserDB);
  // await tasksService.anonymizeAssignee(id);
  await userRepository.delete(id)
  const findUser = await userRepository.findOne(id);

  // if(deletedUser.affected){
  //   return true
  // }
  return findUser;
}

// const updateUser = async (user: IUserProps, updateInfo: Partial<IUserProps>): Promise<IUserProps> => {
//   const idx = dbUsers.indexOf(user);
//   const updateUserInfo = { ...user, ...updateInfo };

//   dbUsers.splice(idx, 1, updateUserInfo);
//   return updateUserInfo;
// };

const updateUser = async (user: UserDB, updateInfo: Partial<IUserProps>) => {
  const userRepository = await getRepository(UserDB);
  const findUser = await userRepository.findOne(user.id);
  console.log('update userRepository',userRepository);
  if (findUser === undefined) return null;
  if (user.id === undefined) return null;
  await userRepository.update(user.id, { ...updateInfo });
  return findUser;
}


export { getAllUsers, createUser, getById, deleteUser, updateUser };
