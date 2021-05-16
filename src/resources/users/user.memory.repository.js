const db = [];

const getAll = async () => db;

const save = async (data) => db.push(data);

const getById = async (id) => db.find((user) => user.id === id);

const deleteUser = async (id) => {
  const user = await this.getById(id);
  const idx = db.indexOf(user);
  db.splice(idx, 1);
};

const update = async (user, updateInfo) => {
  const idx = db.indexOf(user);
  const { name: userName, login: userLogin } = updateInfo;

  const updateUser = {
    id: user.id,
    name: userName ||  user.name,
    login: userLogin ||  user.login,
    password: user.password,
  }

  db.splice(idx, 1, updateUser);
  return updateUser;
};

module.exports = { getAll, save, getById, deleteUser, update };
