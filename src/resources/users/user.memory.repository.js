const User = require('./user.model');

const db = [new User()];

const getAll = async () => db;

const save = async (data) => db.push(data);

const getById = async (id) => db.find((user) => user.id === id);

const deleteUser = async (id) => {
  const user = await getById(id);
  const idx = db.indexOf(user);
  db.splice(idx, 1);
  return user || {};
};

const update = async (user, updateInfo) => {
  const idx = db.indexOf(user);
  const updateUser = { ...user, ...updateInfo };

  db.splice(idx, 1, updateUser);
  return updateUser;
};

module.exports = { getAll, save, getById, deleteUser, update };
