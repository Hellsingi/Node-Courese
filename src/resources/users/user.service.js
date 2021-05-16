const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const save = (data) => usersRepo.save(data);

const getById = async (id) => {
  const user = await usersRepo.getById(id);
  if (!user) return {};

  return user;
};

const deleteUser = async (id) => {
  const taskDb = await taskRepo.getAll();
  taskDb.forEach((task) => {
    if (task.userId === id) {
      taskRepo.deleteTask(task.id);
    }
  });
  usersRepo.deleteUser(id);
};

const update = (user, updateInfo) => usersRepo.update(user, updateInfo);

module.exports = { getAll, save, getById, deleteUser, update };
