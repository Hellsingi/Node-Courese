import { IUserProps } from './user.types';

const dbUsers: IUserProps[] = [];

const getAllUsers = async () => dbUsers;

const createUser = async (user: IUserProps) => dbUsers.push(user);

const getById = async (id: string) => dbUsers.find((user) => user.id === id);

const deleteUser = async (id: string) => {
  const user = await getById(id);
  if (!user) return null;
  const idx = dbUsers.indexOf(user);
  dbUsers.splice(idx, 1);
  return user;
};

const updateUser = async (user: IUserProps, updateInfo: Partial<IUserProps>): Promise<IUserProps> => {
  const idx = dbUsers.indexOf(user);
  const updateUserInfo = { ...user, ...updateInfo };

  dbUsers.splice(idx, 1, updateUserInfo);
  return updateUserInfo;
};

export { getAllUsers, createUser, getById, deleteUser, updateUser };
